package accenture.web.rest.testeDto;

public class BoardChangeDTO {
    public BoardChangeDTO() {}
    public BoardChangeDTO(String sourceBoardId, String targetBoard) {
        this.sourceBoardId = sourceBoardId;
        this.targetBoardId = targetBoard;
    }

    public String getSourceBoardId() {
        return sourceBoardId;
    }

    public void setSourceBoardId(String sourceBoardId) {
        this.sourceBoardId = sourceBoardId;
    }

    public String getTargetBoardId() {
        return targetBoardId;
    }

    public void setTargetBoardId(String targetBoardId) {
        this.targetBoardId = targetBoardId;
    }
    String sourceBoardId;
    String targetBoardId;

}
