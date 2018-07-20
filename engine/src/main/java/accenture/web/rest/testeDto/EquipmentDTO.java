package accenture.web.rest.testeDto;

import java.util.List;

public class EquipmentDTO {

    List<BoardDTO> boards;
    String id;
    String name;
    public EquipmentDTO() {}
    public EquipmentDTO(java.lang.String id, java.lang.String name, List<BoardDTO> boards) {
        this.boards = boards;
        this.name = name;
        this.id = id;
    }

    public List<BoardDTO> getBoards() {
        return boards;
    }

    public void setBoards(List<BoardDTO> boards) {
        this.boards = boards;
    }

    public java.lang.String getId() {
        return id;
    }

    public void setId(java.lang.String id) {
        this.id = id;
    }

    public java.lang.String getName() {
        return name;
    }

    public void setName(java.lang.String name) {
        this.name = name;
    }
}
