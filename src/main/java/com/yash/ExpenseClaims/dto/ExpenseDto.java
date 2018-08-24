package com.yash.ExpenseClaims.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.engine.jdbc.BinaryStream;
import org.springframework.context.annotation.Configuration;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.InputStream;
import java.io.Serializable;
import java.sql.Blob;
import java.util.Date;

@Configuration
public class ExpenseDto implements Serializable {

    @JsonProperty("expenseID")
    private int expenseID;

    @JsonProperty("firstName")
    private String firstName;

    @JsonProperty("lastName")
    private String lastName;

    @NotNull
    @Size(min = 2, max = 30)
    @JsonProperty("username")
    private String username;

    @JsonProperty("managerName")
    private String managerName;

    @JsonProperty("expenseName")
    private String expenseName;

    @JsonProperty("creationDate")
    private Date creationDate;

    @JsonProperty("amount")
    private Double amount;

    @JsonProperty("status")
    private String status;

    @JsonProperty("fileName")
    private String fileName;

    @JsonProperty("fileID")
    private int fileID;

    @JsonProperty("fileType")
    private String fileType;

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    @JsonProperty("files")
    private transient byte[] files;

    public int getExpenseID() {
        return expenseID;
    }

    public void setExpenseID(int expenseID) {
        this.expenseID = expenseID;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getManagerName() {
        return managerName;
    }

    public void setManagerName(String managerName) {
        this.managerName = managerName;
    }

    public String getExpenseName() {
        return expenseName;
    }

    public void setExpenseName(String expenseName) {
        this.expenseName = expenseName;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public int getFileID() {
        return fileID;
    }

    public void setFileID(int fileID) {
        this.fileID = fileID;
    }

    public byte[] getFiles() {
        return files;
    }

    public void setFiles(byte[] files) {
        this.files = files;
    }
}
