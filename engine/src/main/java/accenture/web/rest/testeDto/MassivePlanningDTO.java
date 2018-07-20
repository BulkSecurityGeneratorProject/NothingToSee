package accenture.web.rest.testeDto;

import java.util.List;

public class MassivePlanningDTO {
//    public MassivePlanningDTO(EquipmentDTO sourceEquipment, EquipmentDTO targetEquipmen) {
//        this.sourceEquipment = sourceEquipment;
//        this.targetEquipment = targetEquipment;
//    }

    public EquipmentDTO getSourceEquipment() {
        return sourceEquipment;
    }

    public void setSourceEquipment(EquipmentDTO sourceEquipment) {
        this.sourceEquipment = sourceEquipment;
    }

    public EquipmentDTO getTargetEquipment() {
        return targetEquipment;
    }

    public void setTargetEquipment(EquipmentDTO targetEquipment) {
        this.targetEquipment = targetEquipment;
    }

    public List<BoardChangeDTO> getBoardsChange() {
        return boardsChange;
    }

    public void setBoardsChange(List<BoardChangeDTO> boardsChange) {
        this.boardsChange = boardsChange;
    }

    EquipmentDTO sourceEquipment;
    EquipmentDTO targetEquipment;
    List<BoardChangeDTO> boardsChange;
}
