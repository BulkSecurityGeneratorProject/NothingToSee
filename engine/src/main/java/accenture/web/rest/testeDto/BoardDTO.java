package accenture.web.rest.testeDto;

public class BoardDTO {
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    String name;
    public BoardDTO(String name) {
        this.name = name;
    }
}
