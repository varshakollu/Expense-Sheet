package com.yash.ExpenseClaims.services;

import com.yash.ExpenseClaims.dto.ExpenseDto;
import com.yash.ExpenseClaims.repositories.EmailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Map;

@Service
public class EmailService {

    @Autowired
    private EmailRepository emailRepository;

    @Autowired
    private JavaMailSender sender;

    public void sendEmail(String username, String expenseName) {

        Map<String, String> map = emailRepository.getEmailInfo(username);
        try {
            MimeMessage message = sender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);

            helper.setTo(map.get("m_email"));
            helper.setCc(map.get("e_email"));
            helper.setSubject(expenseName);

            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.append("<html><body>\n" +
                    "\n" +
                    "<p>Hello " + map.get("m_firstname") + " " + map.get("m_lastname") + "</p>\n" +
                    "\n" +
                    "\n" +
                    "<p>" + map.get("e_firstname") + " " + map.get("e_lastname") + " has uploaded an expense in the Expense Reimbursement System</p>\n" +
                    "\n" +
                    "\n" +
                    "<p> To review and approve this expense, <a href=\"http://localhost:8080\">Click here</a></p>" +
                    "</body>\n" +
                    "</html>");
            helper.setText(stringBuilder.toString(), true);

            sender.send(message);

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    public void sendEmailToAccounting(int expenseID) {

        Map<String, Object> map = emailRepository.getExpenseInfo(expenseID);
        try {
            MimeMessage message = sender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);

            helper.setTo("yashaccounting.team@gmail.com");
            helper.setSubject((String) map.get("expenseName"));

            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.append("<html><body>\n" +
                    "\n" +
                    "<p>Hello Accounting team, " + "</p>\n" +
                    "\n" +
                    "\n" +
                    "<p>" + map.get("e_firstname") + " " + map.get("e_lastname") + " has uploaded an expense for an amount of $" + map.get("amount") + " and has been approved by " + map.get("m_firstname") + " " + map.get("m_lastname") + "</p>\n" +
                    "\n" +
                    "\n" +
                    "<p> To review and approve this expense, <a href=\"http://localhost:8080\">Click here</a></p>" +
                    "</body>\n" +
                    "</html>");
            helper.setText(stringBuilder.toString(), true);

            sender.send(message);

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    public void sendEmailToManagerOnEmployeeComments(int expenseID) {

        Map<String, Object> map = emailRepository.getManagerAndEmployeeInfo(expenseID);
        try {
            MimeMessage message = sender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);

            helper.setTo((String) map.get("m_email"));
            helper.setSubject((String) map.get("expenseName"));

            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.append("<html><body>\n" +
                    "\n" +
                    "<p>Hello " + map.get("m_firstname") + " " + map.get("m_lastname") + "</p>\n" +
                    "\n" +
                    "\n" +
                    "<p>" + map.get("e_firstname") + " " + map.get("e_lastname") + " has updated an expense record that has already uploaded. </p>\n" +
                    "\n" +
                    "\n" +
                    "<p> To review and approve this expense, <a href=\"http://localhost:8080\">Click here</a></p>" +
                    "</body>\n" +
                    "</html>");
            helper.setText(stringBuilder.toString(), true);

            sender.send(message);

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    public void sendEmailToEmployeeForReviewPending(int expenseID) {
        Map<String, Object> map = emailRepository.getManagerAndEmployeeInfo(expenseID);
        try {
            MimeMessage message = sender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);

            helper.setTo((String) map.get("e_email"));
            helper.setSubject((String) map.get("expenseName"));

            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.append("<html><body>\n" +
                    "\n" +
                    "<p>Hello " + map.get("e_firstname") + " " + map.get("e_lastname") + "</p>\n" +
                    "\n" +
                    "\n" +
                    "<p>" + map.get("m_firstname") + " " + map.get("m_lastname") + " has reviewed the expense record you uploaded and requested for more information. </p>\n" +
                    "\n" +
                    "\n" +
                    "<p> To address the comments for this expense, <a href=\"http://localhost:8080\">Click here</a></p>" +
                    "</body>\n" +
                    "</html>");
            helper.setText(stringBuilder.toString(), true);

            sender.send(message);

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    public void sendEmailToEmployeeForDeclinedExpense(int expenseID) {
        Map<String, Object> map = emailRepository.getManagerAndEmployeeInfo(expenseID);
        try {
            MimeMessage message = sender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);

            helper.setTo((String) map.get("e_email"));
            helper.setSubject((String) map.get("expenseName"));

            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.append("<html><body>\n" +
                    "\n" +
                    "<p>Hello " + map.get("e_firstname") + " " + map.get("e_lastname") + "</p>\n" +
                    "\n" +
                    "\n" +
                    "<p>" + map.get("m_firstname") + " " + map.get("m_lastname") + " has reviewed and declined the expense record you uploaded. </p>\n" +
                    "\n" +
                    "\n" +
                    "<p> To upload a new expense, <a href=\"http://localhost:8080\">Click here</a></p>" +
                    "</body>\n" +
                    "</html>");
            helper.setText(stringBuilder.toString(), true);

            sender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    public void sendEmailToManagerOnAccountantComments(ExpenseDto expenseDto) {
        Map<String, Object> map = emailRepository.getManagerAndAccountantInfo(expenseDto.getExpenseID(),expenseDto.getUsername());

        try {
            MimeMessage message = sender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);

            helper.setTo((String) map.get("m_email"));
            helper.setSubject(expenseDto.getExpenseName());

            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.append("<html><body>\n" +
                    "\n" +
                    "<p>Hello " + map.get("m_firstname") + " " + map.get("m_lastname") + "</p>\n" +
                    "\n" +
                    "\n" +
                    "<p>" + map.get("a_firstname") + " " + map.get("a_lastname") + ", from Accounting team has reviewed and commented on the expense record you have approved. </p>\n" +
                    "\n" +
                    "\n" +
                    "<p> To Address these comments, <a href=\"http://localhost:8080\">Click here</a></p>" +
                    "</body>\n" +
                    "</html>");
            helper.setText(stringBuilder.toString(), true);

            sender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
