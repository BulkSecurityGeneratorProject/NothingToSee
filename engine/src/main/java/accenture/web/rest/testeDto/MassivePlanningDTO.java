package accenture.web.rest.testeDto;

import java.util.List;

public class MassivePlanningDTO {

    public String getSourceEquipmentId() {
        return sourceEquipmentId;
    }

    public void setSourceEquipmentId(String sourceEquipmentId) {
        this.sourceEquipmentId = sourceEquipmentId;
    }

    public String getTargetEquipmentId() {
        return targetEquipmentId;
    }

    public void setTargetEquipmentId(String targetEquipmentId) {
        this.targetEquipmentId = targetEquipmentId;
    }

    public List<BoardChangeDTO> getBoardsChange() {
        return boardsChange;
    }

    public void setBoardsChange(List<BoardChangeDTO> boardsChange) {
        this.boardsChange = boardsChange;
    }

    String sourceEquipmentId;
    String targetEquipmentId;
    List<BoardChangeDTO> boardsChange;
}
