package accenture.web.rest.testeDto;

import java.util.List;

public class EquipmentDTO {

    List<BoardDTO> boards;
    String id;
    String name;

    public EquipmentDTO(String id, String name, List<BoardDTO> boards) {
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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
