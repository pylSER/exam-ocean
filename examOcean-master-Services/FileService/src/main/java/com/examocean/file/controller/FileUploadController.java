package com.examocean.file.controller;

import com.examocean.file.Repository.*;
import com.examocean.file.VO.CourseVO;
import com.examocean.file.VO.SheetVO;
import com.examocean.file.domain.*;
import com.examocean.file.utils.Header;
import com.examocean.file.utils.ResponseMessage;
import com.examocean.file.utils.Role;
import com.examocean.file.utils.RoleFilter;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.util.*;

@RestController
@RequestMapping("/file/persistence")
public class FileUploadController {

    private AnswerRepository answerRepository;
    private QuestionRepository questionRepository;
    private CourseRepository courseRepository;
    private SheetRepository sheetRepository;
    private StudentRepository studentRepository;
    private TeacherRepository teacherRepository;
    private CourseMapRepository courseMapRepository;

    public FileUploadController(AnswerRepository answerRepository, QuestionRepository questionRepository, CourseRepository courseRepository, SheetRepository sheetRepository, StudentRepository studentRepository, TeacherRepository teacherRepository, CourseMapRepository courseMapRepository) {
        this.answerRepository = answerRepository;
        this.questionRepository = questionRepository;
        this.courseRepository = courseRepository;
        this.sheetRepository = sheetRepository;
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.courseMapRepository = courseMapRepository;
    }

    @GetMapping("/getQuestion")
    public Map<String,Object> getLibrary(HttpServletRequest request){
        ResponseMessage msg;
        Map<String,Object> keyMap = new HashMap<>();

        String username = RoleFilter.getRole(request, Role.TEACHER);
        if(null==username){
            msg = new ResponseMessage(1,"You are not authorized to use this service!");
            keyMap.put("msg",msg);
            return keyMap;
        }

        Teacher teacher = new Teacher();
        try{
            teacher = teacherRepository.findByUsername(username);
            if(null == teacher){
                msg =  new ResponseMessage(1,"The teacher whose username is '"+username+"' doesn't exist!");
                keyMap.put("msg",msg);
                return keyMap;
            }
        }catch (Exception e){
            msg =  new ResponseMessage(1,"There are two or more teachers with the same username");
            keyMap.put("msg",msg);
            return keyMap;
        }

        List<CourseVO> courses = new ArrayList<>();

        Iterable<CourseMap> courseMaps = courseMapRepository.findAllByTeacherId(teacher.getId());
        Iterator<CourseMap> courseMapIterator = courseMaps.iterator();
        while(courseMapIterator.hasNext()){
            CourseMap courseMap = courseMapIterator.next();
            Course course = courseMap.getCourse();
            int num = 0;
            if(null!=course) {
                num = questionRepository.countAllByCourseId(course.getId());
            }else{
                msg = new ResponseMessage(1,"Wrong CourseMap");
                keyMap.put("msg",msg);
                return keyMap;
            }
            CourseVO courseVO = new CourseVO();
            courseVO.setDescription(course.getDescription());
            courseVO.setId(course.getId());
            courseVO.setName(course.getName());
            courseVO.setNum(num);

            courses.add(courseVO);

        }

        if(courses.size()<=0){
            msg = new ResponseMessage(1,"You haven't create a question library");
            keyMap.put("msg",msg);
            return keyMap;
        }




        msg = new ResponseMessage(0,"Your question libraries are successfully achieved!");
        keyMap.put("msg",msg);
        keyMap.put("libraries",courses);
        return keyMap;

    }

    @GetMapping("/getClass")
    public Map<String,Object> getSheets(HttpServletRequest request){
        ResponseMessage msg;
        Map<String,Object> keyMap = new HashMap<>();

        String username = RoleFilter.getRole(request, Role.TEACHER);
        if(null==username){
            msg = new ResponseMessage(1,"You are not authorized to use this service!");
            keyMap.put("msg",msg);
            return keyMap;
        }

        List<SheetVO> sheetVOs = new ArrayList<>();
        Iterable<Sheet> sheets = sheetRepository.findAll();
        Iterator<Sheet> sheetIterator = sheets.iterator();
        while(sheetIterator.hasNext()){
            Sheet sheet = sheetIterator.next();
            SheetVO sheetVO = new SheetVO();
            sheetVO.setId(sheet.getId());
            sheetVO.setDescription(sheet.getDescription());
            sheetVO.setName(sheet.getName());
            try {
                sheetVO.setNum(sheet.getStudent().size());
            }catch(Exception e){
                System.out.println("Sheet '"+sheet.getName()+"' doesn't has a student!");
                continue;
            }
            sheetVOs.add(sheetVO);
        }


        if(sheetVOs.size()<=0){
            msg = new ResponseMessage(1,"There is no sheet in the system!");
            keyMap.put("msg",msg);
            return keyMap;
        }



        msg = new ResponseMessage(0,"The student sheets are successfully achieved!");
        keyMap.put("msg",msg);
        keyMap.put("classes",sheetVOs);
        return keyMap;
    }

    @PostMapping("/question")
    public ResponseMessage addQuestion(HttpServletRequest request,@RequestParam("upload") MultipartFile file, @RequestParam("courseName") String courseName,@RequestParam("description") String description){
//            courseRepository.save(new Course("Test"));
        String username = RoleFilter.getRole(request, Role.TEACHER);
        if(null==username){
            return new ResponseMessage(1,"You are not authorized to use this service!");
        }

        Teacher teacher = new Teacher();
        try{
            teacher = teacherRepository.findByUsername(username);
            if(null == teacher){
                return new ResponseMessage(1,"The teacher whose username is '"+username+"' doesn't exist!");
            }
        }catch (Exception e){
            return new ResponseMessage(1,"There are two teachers with the same username");
        }





        if(!file.isEmpty()){

            try {
                InputStream fis = file.getInputStream();
                XSSFWorkbook workbook = new XSSFWorkbook(fis);
                XSSFSheet sheet = workbook.getSheet("QUESTION");
                if(null==sheet){
                    return new ResponseMessage(1,"The file doesn't has a sheet named 'QUESTION'");
                }
                Iterator<Row> rowIterator = sheet.iterator();
                XSSFRow title = (XSSFRow) rowIterator.next();

                if(isValidSchema(title,Header.QUESTION)){

                    Iterable<Course> courses = courseRepository.findByName(courseName);
                    Iterator<Course> courseIterator = courses.iterator();


                    if(courseIterator.hasNext()){
                        return new ResponseMessage(1,"This question library has already existed!");
                    }

                    Course course = new Course(courseName,description);

                    course = courseRepository.save(course);

                    CourseMap courseMap = new CourseMap();
                    courseMap.setCourse(course);
                    courseMap.setTeacher(teacher);
                    courseMapRepository.save(courseMap);

                    while(rowIterator.hasNext()){
                        XSSFRow item = (XSSFRow) rowIterator.next();
                        Question question = new Question(item.getCell(1).getStringCellValue(),course);

                        question = questionRepository.save(question);


                        for(int j=2;j<item.getLastCellNum();j+=2){

                            String content = item.getCell(j).getStringCellValue();
                            if(null==content||content.isEmpty()){
                                break;
                            }else{
                                XSSFCell trueCell= item.getCell(j+1);


                                Boolean isTrueAnswer =false;
                                if(trueCell!=null&&trueCell.getNumericCellValue()==1){
                                    isTrueAnswer = true;
                                }

                                Answer answer = new Answer(content,isTrueAnswer,question);

                                answerRepository.save(answer);
                            }

                        }

                    }

                }else{
                    return new ResponseMessage(1,"The question template is not valid! Please download the template and upload again");
                }

            } catch (IOException e) {
                e.printStackTrace();
            }


        }

//            Iterable<Answer> answers = answerRepository.findAll();
//            Iterator<Answer> answerIterator = answers.iterator();
//            while(answerIterator.hasNext()){
//                Answer answer = answerIterator.next();
//                System.out.println(answer.getContent()+"  "+answer.getTrue());
//            }


        return new ResponseMessage(0,"The File is successfully uploaded!");
    }

    @PostMapping("/nameList")
    public ResponseMessage addSheet(HttpServletRequest request,@RequestParam("upload") MultipartFile file,@RequestParam String sheetName,@RequestParam String description){
//        studentRepository.save(new Student("哪吒","141250089","141250089@smail.nju.edu.cn","123"));
//        studentRepository.save(new Student("杨戬","141250088","141250088@smail.nju.edu.cn","123"));
//        studentRepository.save(new Student("雷震子","65465654","65465654@smail.nju.edu.cn","123"));

        String username = RoleFilter.getRole(request, Role.TEACHER);
        if(null==username){
            return new ResponseMessage(1,"You are not authorized to use this service!");
        }



        Iterable<Sheet> sheets = sheetRepository.findByName(sheetName);
        Iterator<Sheet> sheetIterator = sheets.iterator();

        if(!sheetIterator.hasNext() ){

            Set<Student> students = new HashSet<>();

            if(!file.isEmpty()){
                try{
                    InputStream fis = file.getInputStream();
                    XSSFWorkbook workbook = new XSSFWorkbook(fis);
                    XSSFSheet worksheet = workbook.getSheet("NAMELIST");
                    if(null==worksheet){
                        return new ResponseMessage(1,"The file doesn't has a sheet named 'NAMELIST'");
                    }
                    Iterator<Row> rowIterator = worksheet.iterator();
                    XSSFRow title = (XSSFRow) rowIterator.next();

                    if(isValidSchema(title,Header.NAMELIST)){
                        while(rowIterator.hasNext()){
                            XSSFRow item = (XSSFRow) rowIterator.next();
                            XSSFCell cell = item.getCell(1);
                            cell.setCellType(CellType.STRING);
                            String number = cell.getStringCellValue();


                            Iterable<Student> studentIterable = studentRepository.findByNumber(number);
                            Iterator<Student> studentIterator = studentIterable.iterator();
                            if(studentIterator.hasNext()){
                                Student student = studentIterator.next();
                                students.add(student);
                            }else {

                                return new ResponseMessage(1,"The student whose StuId equals to '"+number+"' does't exist! Please check the file!");
                            }

                            if(studentIterator.hasNext()){
                                return new ResponseMessage(1,"Database Error!There are two students with the same student number!");
                            }

                        }
                        Sheet sheet = new Sheet(sheetName,description,students);
                        sheetRepository.save(sheet);


                    }else{
                        return new ResponseMessage(1,"The question template is not valid! Please download the template and upload again");
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }

                return new ResponseMessage(0,"The name list is succeffully uploaded!");
            }else{
                return new ResponseMessage(1,"The file is empty!");
            }



        }else{
            return new ResponseMessage(1,"This name List has already existed!");
        }




    }

    public Boolean isValidSchema(XSSFRow title,Header header){
        Iterator<Cell> cellIterator = title.iterator();
        String upSchema = "";
        while(cellIterator.hasNext()){
            XSSFCell cell = (XSSFCell)cellIterator.next();
            upSchema = upSchema+cell.getStringCellValue()+";";
        }
        return  upSchema.equals(header.getSchema());
    }
}
