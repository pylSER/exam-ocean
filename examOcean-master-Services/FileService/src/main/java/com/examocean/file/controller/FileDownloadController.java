package com.examocean.file.controller;

import com.examocean.file.Repository.*;
import com.examocean.file.VO.ScoreVO;
import com.examocean.file.domain.Exam;
import com.examocean.file.domain.Sheet;
import com.examocean.file.utils.Header;
import com.examocean.file.utils.ResponseMessage;

import com.examocean.file.utils.Role;
import com.examocean.file.utils.RoleFilter;
import org.apache.poi.xssf.usermodel.*;
import org.springframework.web.bind.annotation.*;


import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.*;

@RestController
@RequestMapping("/file/download")
public class FileDownloadController {
    private ExamRepository examRepository;
    private PaperRepository paperRepository;
    private StudentRepository studentRepository;
    private PaperContentRepository paperContentRepository;
    private ChoiceRepository choiceRepository;
    private AnswerRepository answerRepository;


    public FileDownloadController(ExamRepository examRepository, PaperRepository paperRepository, StudentRepository studentRepository, PaperContentRepository paperContentRepository, ChoiceRepository choiceRepository, AnswerRepository answerRepository) {
        this.examRepository = examRepository;
        this.paperRepository = paperRepository;
        this.studentRepository = studentRepository;
        this.paperContentRepository = paperContentRepository;
        this.choiceRepository = choiceRepository;
        this.answerRepository = answerRepository;
    }

    @GetMapping("template/{type}")
    public ResponseMessage downloadTemplate(HttpServletRequest request,@PathVariable("type") String type, HttpServletResponse response){
        String username = RoleFilter.getRole(request, Role.TEACHER);
        if(null==username){
            return new ResponseMessage(1,"You are not authorized to use this service!");
        }

        String filename =type+".xlsx";
        try {

            Header header = null;

            if(type.equals("question")){
                header = Header.QUESTION;
            }else if(type.equals("nameList")){
                header = Header.NAMELIST;
            }else {
                header = null;
                return new ResponseMessage(1,"The template type is wrong!");
            }
            XSSFWorkbook workbook = createTemplate(header,header.toString());

            writeFile(workbook,filename,response);

        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseMessage(1,"IOException");
        }


        return new ResponseMessage(0,"The template is successfully downloaded");

    }


    @GetMapping("scoreList/{examID}")
    public ResponseMessage downloadScoreList(HttpServletRequest request,@PathVariable("examID") String examId,HttpServletResponse response){
        ResponseMessage msg;

        String username = RoleFilter.getRole(request, Role.TEACHER);
        if(null==username){
            return new ResponseMessage(1,"You are not authorized to use this service!");
        }


        Exam exam = examRepository.findOne(Integer.parseInt(examId));
        if(null==exam){
            msg =  new ResponseMessage(1, "The exam ID is wrong! We can't find this exam!");
            return msg;
        }

        Sheet sheet = exam.getSheet();

        String filename = exam.getName()+".xlsx";

        PaperCalculationController paperCalculationController = new PaperCalculationController(examRepository,paperRepository,studentRepository,paperContentRepository,choiceRepository,answerRepository);

        Map<String,String> map = new HashMap<>();
        map.put("examID",examId);
        Map<String,Object> result= paperCalculationController.calculateAll(request,map);
        List<ScoreVO> scores = (List<ScoreVO>)(result.get("studentList"));


        XSSFWorkbook workbook = createTemplate(Header.SCORES,sheet.getName());
        for(int i = 1;i<=scores.size();i++){
            ScoreVO scoreVO = scores.get(i-1);
            XSSFSheet worksheet = workbook.getSheet(sheet.getName());

            XSSFRow row = worksheet.createRow(i);
            XSSFCell cell1 = row.createCell(0);
            cell1.setCellValue(i);
            XSSFCell cell2 = row.createCell(1);
            cell2.setCellValue(scoreVO.getNumber());
            XSSFCell cell3 = row.createCell(2);
            cell3.setCellValue(scoreVO.getName());
            XSSFCell cell4 = row.createCell(3);
            cell4.setCellValue(scoreVO.getScore());
            XSSFCell cell5 = row.createCell(4);
            cell5.setCellValue(scoreVO.getEmail());


        }

        try {
            writeFile(workbook,filename,response);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseMessage(1,"I/O Exception");
        }


        return new ResponseMessage(0,"The score list is successfully downloaded");
    }







    private void writeFile(XSSFWorkbook workbook,String filename,HttpServletResponse response) throws IOException {
        ByteArrayOutputStream os = new ByteArrayOutputStream();

        workbook.write(os);

        byte[] content = os.toByteArray();
        InputStream is = new ByteArrayInputStream(content);
        response.reset();
        response.setContentType("application/vnd.ms-excel;charset=utf-8");
        response.setHeader("Content-Disposition","attachment;filename="+new String(filename.getBytes(),"iso-8859-1"));
        ServletOutputStream out = response.getOutputStream();


        BufferedInputStream bis = new BufferedInputStream(is);
        BufferedOutputStream bos = new BufferedOutputStream(out);

        byte[] buff = new byte[2048];
        int bytesRead;
        while(-1!=(bytesRead=bis.read(buff,0,buff.length))){
            bos.write(buff,0,bytesRead);
        }

        bis.close();
        bos.close();
    }


    public XSSFWorkbook createTemplate(Header header,String sheetName){

        String schema = header.getSchema();
        String[] fields = schema.split(";");

        XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet sheet = workbook.createSheet(sheetName);
        XSSFRow row = sheet.createRow(0);
        for(int i=0;i<fields.length;i++){
            row.createCell(i).setCellValue(fields[i]);
        }

        return workbook;

    }

}
