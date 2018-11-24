package com.examocean.paper.service;

import com.examocean.paper.entity.*;
import com.examocean.paper.repository.*;
import com.examocean.paper.vo.ExamInfoStudentVO;
import com.examocean.paper.vo.ExamInfoTeacherVO;
import com.examocean.paper.vo.IniExamInfoVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class ExamService {
    //这里暂定考试密码的长度为8位
    private static  int key_code_legth = 8;
    @Autowired
    private ExamRepository examRepo;
    @Autowired
    private SheetRepository sheetRepo;
    @Autowired
    private StudentRepository studentRepo;
    @Autowired
    private TeacherRepository teacherRepo;
    @Autowired
    private CourseMapRepository courseMapRepo;
    @Autowired
    private PaperRepository paperRepo;
    @Autowired
    private PaperContentRepository paperContentRepo;
    @Autowired
    private QuestionRepository questionRepo;
    @Autowired
    private AnswerRepository answerRepo;
    @Autowired
    private AnswerOrderRepository answerOrderRepo;

    @Autowired
    JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String sender; //读取配置文件中的参数

    public void generateExam(String username,IniExamInfoVO iniExamInfoVO) {
        iniExamInfoVO.setTeacherID(transferNameToId(username));
        Exam exam = new Exam();
        exam.setName(iniExamInfoVO.getExamName());
        exam.setStartDate(iniExamInfoVO.getStartDate());
        exam.setEndDate(iniExamInfoVO.getEndDate());
        exam.setPoint(iniExamInfoVO.getPoint());
        exam.setQuestionNumber(iniExamInfoVO.getQuestionNum());
        exam.setKeyCode(getRandomString(key_code_legth));
        exam.setSheet(sheetRepo.findById(iniExamInfoVO.getClassID()));
        exam.setCourseMap(courseMapRepo.findByTeacher_IdAndCourse_Id(iniExamInfoVO.getTeacherID(),iniExamInfoVO.getCourseID()));
        Exam examDB = examRepo.save(exam);

        Set<Student> studentSet = examDB.getSheet().getStudent();
        Iterator iterator = studentSet.iterator();
        while (iterator.hasNext()) {
            Student student = (Student) iterator.next();
            //System.out.println("studentID: "+student.getId());
            generatePaper(student.getId(),examDB);//生成试卷
            sendEmail(student.getId(),examDB.getKeyCode());//发邮件
        }

    }

    private void generatePaper(int student_id, Exam exam) {
        Paper paper = new Paper();
        //大概把一张试卷的信息填充一下，试卷挂靠在学生上
        paper.setExam(exam);
        paper.setStudent(studentRepo.findById(student_id));
        paper.setCalculated(false);
        paper.setScore(-1);//应凌伟的要求，生成试卷的时候把试卷的初始值赋值为-1，2017/12/19
        Paper paperDB = paperRepo.save(paper);

        //从题库中随机选择试题，试题挂靠在试卷上
        List<Question> questionList = questionRepo.findByCourse(exam.getCourseMap().getCourse());
        //Question questionArray[] = (Question[]) questionList.toArray();//再把List转换成Array，为了方便定位

        int length = questionList.size();//试题长度
        //System.out.println("length:  "+length);
        int index = 0;
        List<Question> chosenList = new ArrayList<>();
        while (index<exam.getQuestionNumber()) {
            Question question = questionList.get((int) Math.floor(Math.random()*length));
            if (!chosenList.contains(question)) {
                index++;
                chosenList.add(question);
                PaperContent paperContent = new PaperContent();
                paperContent.setMarked(false);
                paperContent.setNumber(index);
                paperContent.setPaper(paperDB);
                paperContent.setQuestion(question);
                PaperContent paperContentDB = paperContentRepo.save(paperContent);

                //随机化答案的顺序，答案挂靠在试题上，和上面的随机方法差不多
                List<Answer> answerList = answerRepo.findByQuestion(question);
                List<Answer> answerChosenList = new ArrayList<>();
                int count = 0;
                int answerArrayLength = answerList.size();
                while (count<answerArrayLength){
                    Answer answer = answerList.get((int)Math.floor(Math.random()*answerArrayLength));
                    if (!answerChosenList.contains(answer)){
                        count++;
                        answerChosenList.add(answer);
                        AnswerOrder answerOrder = new AnswerOrder();
                        answerOrder.setAnswer(answer);
                        answerOrder.setAnsworder(count);
                        answerOrder.setQuestion(question);
                        answerOrder.setPaperContent(paperContentDB);
                        answerOrderRepo.save(answerOrder);
                    }
                }
            }
        }
    }

    private void sendEmail(int studentId,String key_code) {
        String emailAddress = studentRepo.findById(studentId).getEmail();
        System.out.println("key_code:  "+key_code+"emailAddress: "+emailAddress);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(sender);
        message.setTo(emailAddress);
        message.setSubject("本次考试密钥");
        message.setText("be happy with the exam,validation code is:"+key_code);

        try {
            this.mailSender.send(message);
            System.out.println("email sent successfully");
        }
        catch (Exception e) {
            System.out.println("something wrong");
            System.out.println(e);//为了方便调试，把错误信息打出
        }
    }

    //这里一是检查考试日期和当前日期的关系，二是要看学生是否已经交卷了
    private int checkState(String startDate,String endDate,Boolean calculated) {
        //System.out.print("startDate:"+startDate);
        //System.out.println("    endDate:"+endDate);

        SimpleDateFormat formater = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        String nowDate = formater.format(new Date());
        //System.out.println("nowDate:"+nowDate);
        if (nowDate.compareTo(startDate)<0) {
            return 0;//future exam
        }
        else if (nowDate.compareTo(startDate)>=0&&nowDate.compareTo(endDate)<0) {
            if (calculated) {
                return 2;//past exam
            }
            else {
                return 1;//current exam
            }
        }
        else if (nowDate.compareTo(endDate)>=0) {
            return 2;//past exam
        }
        return -100;//just a message for debugging
    }

    //获取指定位数的随机字符串(包含小写字母、大写字母、数字,length>0)
    private String getRandomString(int length) {
        //随机字符串的随机字符库
        String KeyString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuffer sb = new StringBuffer();
        int len = KeyString.length();
        for (int i = 0; i < length; i++) {
            sb.append(KeyString.charAt((int) Math.round(Math.random() * (len - 1))));
        }
        return sb.toString();
    }

    //根据cookie里面获取到的教师name获得教师id
    private int transferNameToId(String username){
        //System.out.println("teacher's name: "+username);
        Teacher teacher =  teacherRepo.findByUsername(username);
        return teacher.getId();
    }



    //teacher: interface 4/5/6获取教师的考试信息
    private List<ExamInfoTeacherVO> getAllExamForTeacher(String username) {
        List<ExamInfoTeacherVO> resultList = new ArrayList<>();
        List<CourseMap> courseMapList =
                courseMapRepo.findByTeacher_Id(transferNameToId(username));

        for (CourseMap coursemap: courseMapList){
            List<Exam> examList = examRepo.findByCourseMap_Id(coursemap.getId());
            for (Exam exam : examList) {
                ExamInfoTeacherVO teacherVO = new ExamInfoTeacherVO();
                teacherVO.setExamID(exam.getId());
                teacherVO.setExamName(exam.getName());
                teacherVO.setQuestionNum(exam.getQuestionNumber());
                teacherVO.setStartDate(exam.getStartDate());
                teacherVO.setEndDate(exam.getEndDate());

                List<Paper> paperList = paperRepo.findByExam_Id(exam.getId());
                teacherVO.setStudentNum(paperList.size());
                resultList.add(teacherVO);
//                System.out.println("time checking: "+checkDate(teacherVO.getStartDate(),
//                        teacherVO.getEndDate()));
            }

        }
        return resultList;
    }

    public List<ExamInfoTeacherVO> getExamNotStartedForTeacher(String username) {

        List<ExamInfoTeacherVO> notStartedList = new ArrayList<>();
        List<ExamInfoTeacherVO> allList = getAllExamForTeacher(username);
        for (ExamInfoTeacherVO teacherVO: allList) {
            if (checkState(teacherVO.getStartDate(),teacherVO.getEndDate(),false)==0) {
                notStartedList.add(teacherVO);
            }
        }
        return notStartedList;
    }

    public List<ExamInfoTeacherVO> getCurrentExamForTeacher(String username) {
        List<ExamInfoTeacherVO> currentList = new ArrayList<>();
        List<ExamInfoTeacherVO> allList = getAllExamForTeacher(username);
        for (ExamInfoTeacherVO teacherVO: allList) {
            if (checkState(teacherVO.getStartDate(),teacherVO.getEndDate(),false)==1) {
                currentList.add(teacherVO);
            }
        }
        return currentList;
    }

    public List<ExamInfoTeacherVO> getExamFinishedForTeacher(String username) {
        List<ExamInfoTeacherVO> finishedList = new ArrayList<>();
        List<ExamInfoTeacherVO> allList = getAllExamForTeacher(username);
        for (ExamInfoTeacherVO teacherVO: allList) {
            if (checkState(teacherVO.getStartDate(),teacherVO.getEndDate(),false)==2) {
                finishedList.add(teacherVO);
            }
        }
        return finishedList;
    }




    //student:interface 7/8/9/10获取学生的考试信息
    private List<ExamInfoStudentVO> getAllExamForStudent(int student_id) {
        List<ExamInfoStudentVO> resultList = new ArrayList<>();
        Student student = studentRepo.findById(student_id);
        List<Sheet> sheetList = sheetRepo.findByStudent(student);

        for (Sheet sheet: sheetList){
            List<Exam> examList = examRepo.findBySheet_Id(sheet.getId());
            for (Exam exam : examList) {
                ExamInfoStudentVO studentVO = new ExamInfoStudentVO();
                //System.out.println("examId: "+exam.getId());
                studentVO.setExamID(exam.getId());
                studentVO.setExamName(exam.getName());
                studentVO.setStartDate(exam.getStartDate());
                studentVO.setEndDate(exam.getEndDate());
                studentVO.setTotalScore(exam.getPoint()*exam.getQuestionNumber());
                studentVO.setScore(paperRepo.findByExamAndStudent(exam,studentRepo.findById(student_id)).getScore());
                //studentVO.setExaming(exam.get);
                resultList.add(studentVO);
            }
        }
        return resultList;
    }

    public List<ExamInfoStudentVO> getExamNotStartedForStudent(int student_id) {
        List<ExamInfoStudentVO> notStartedList = new ArrayList<>();
        List<ExamInfoStudentVO> allList = getAllExamForStudent(student_id);
        for (ExamInfoStudentVO studentVO: allList) {
            boolean calculated = paperRepo.findByExam_IdAndStudent_Id(studentVO.getExamID(),student_id).getCalculated();
            if (checkState(studentVO.getStartDate(),studentVO.getEndDate(),calculated)==0) {
                notStartedList.add(studentVO);
            }
        }
        return notStartedList;
    }

    public List<ExamInfoStudentVO> getCurrentExamForStudent(int student_id) {
        List<ExamInfoStudentVO> CurrentExamList = new ArrayList<>();
        List<ExamInfoStudentVO> allList = getAllExamForStudent(student_id);
        for (ExamInfoStudentVO studentVO: allList) {
            boolean calculated = paperRepo.findByExam_IdAndStudent_Id(studentVO.getExamID(),student_id).getCalculated();
            if (checkState(studentVO.getStartDate(),studentVO.getEndDate(),calculated)==1) {
                studentVO.setExaming(true);
                CurrentExamList.add(studentVO);
            }
        }
        return CurrentExamList;
    }


    public List<ExamInfoStudentVO> getExamFinishedForStudent(int student_id) {
        List<ExamInfoStudentVO> finishedList = new ArrayList<>();
        List<ExamInfoStudentVO> allList = getAllExamForStudent(student_id);
        for (ExamInfoStudentVO studentVO: allList) {
            boolean calculated = paperRepo.findByExam_IdAndStudent_Id(studentVO.getExamID(),student_id).getCalculated();
            if (checkState(studentVO.getStartDate(),studentVO.getEndDate(),calculated)==2) {
                finishedList.add(studentVO);
            }
        }
        return finishedList;
    }

    //student interface:7
    public List<ExamInfoStudentVO> getExamRecordForStudent(int student_id){
        return getAllExamForStudent(student_id);
    }

}