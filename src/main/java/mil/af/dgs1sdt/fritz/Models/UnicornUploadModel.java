package mil.af.dgs1sdt.fritz.Models;

import lombok.Data;

@Data
public class UnicornUploadModel {
  private String productName;
  private String missionId;
  private String targetEventId;
  private String classificationId;
  private String releasabilityId;
  private String personnelId = "2a7081f8-7cc9-45f3-a29e-f94a0003b3fe";
  private String isrRoleId;
  private String endFilePath;
  private String uploadType = "targetevent";
  private String uploadedFile;
  private String fileName;

  public String getProductName() {
    return productName;
  }

  public void setProductName(String productName) {
    this.productName = productName;
  }

  public String getMissionId() {
    return missionId;
  }

  public void setMissionId(String missionId) {
    this.missionId = missionId;
  }

  public String getTargetEventId() {
    return targetEventId;
  }

  public void setTargetEventId(String targetEventId) {
    this.targetEventId = targetEventId;
  }

  public String getClassificationId() {
    return classificationId;
  }

  public void setClassificationId(String classificationId) {
    this.classificationId = classificationId;
  }

  public String getReleasabilityId() {
    return releasabilityId;
  }

  public void setReleasabilityId(String releasabilityId) {
    this.releasabilityId = releasabilityId;
  }

  public String getPersonnelId() {
    return personnelId;
  }

  public void setPersonnelId(String personnelId) {
    this.personnelId = personnelId;
  }

  public String getIsrRoleId() {
    return isrRoleId;
  }

  public void setIsrRoleId(String isrRoleId) {
    this.isrRoleId = isrRoleId;
  }

  public String getEndFilePath() {
    return endFilePath;
  }

  public void setEndFilePath(String endFilePath) {
    this.endFilePath = endFilePath;
  }

  public String getUploadType() {
    return uploadType;
  }

  public void setUploadType(String uploadType) {
    this.uploadType = uploadType;
  }

  public String getUploadedFile() {
    return uploadedFile;
  }

  public void setUploadedFile(String uploadedFile) {
    this.uploadedFile = uploadedFile;
  }

  public String getFileName() {
    return fileName;
  }

  public void setFileName(String filename) {
    this.fileName = filename;
  }
}
