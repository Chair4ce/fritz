package mil.af.dgs1sdt.fritz.Models;

import lombok.Data;

@Data
public class RenameModel {

  private String _oldName;
  private String _newName;
  private boolean _deleted;

  public RenameModel(String _oldName, String _newName, boolean _deleted) {
    this._oldName = _oldName;
    this._newName = _newName;
    this._deleted = _deleted;
  }

  public String getOldName() {
    return this._oldName;
  }

  public String getNewName() {
    return this._newName;
  }

  public boolean getDeleted() { return this._deleted; }

  public void setOldName(String name) {
    this._oldName = name;
  }

  public void setNewName(String name) {
    this._newName = name;
  }

  public void setDeleted(boolean deleted) { this._deleted = deleted; }
}
