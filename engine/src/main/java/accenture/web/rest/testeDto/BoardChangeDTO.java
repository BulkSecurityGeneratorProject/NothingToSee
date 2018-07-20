package accenture.web.rest.testeDto;

public class BoardChangeDTO {
    public BoardChangeDTO() {}
    public BoardChangeDTO(BoardDTO sourceBoard, BoardDTO targetBoard) {
        this.sourceBoard = sourceBoard;
        this.targetBoard = targetBoard;
    }

    public BoardDTO getSourceBoard() {
        return sourceBoard;
    }

    public void setSourceBoard(BoardDTO sourceBoard) {
        this.sourceBoard = sourceBoard;
    }

    public BoardDTO getTargetBoard() {
        return targetBoard;
    }

    public void setTargetBoard(BoardDTO targetBoard) {
        this.targetBoard = targetBoard;
    }
    BoardDTO sourceBoard;
    BoardDTO targetBoard;

}
