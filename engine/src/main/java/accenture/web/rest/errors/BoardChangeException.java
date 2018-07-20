package accenture.web.rest.errors;

import accenture.web.rest.testeDto.BoardChangeDTO;

import java.util.List;

public class BoardChangeException  extends RuntimeException{
    List<BoardChangeDTO> boardChanges;
    public BoardChangeException(List<BoardChangeDTO> boards) {
        super("Algumas placas não poderam ser manobradas =(.");
        this.boardChanges = boards;
    }

    public List<BoardChangeDTO> getBoardChanges() {
        return this.boardChanges;
    }
}
