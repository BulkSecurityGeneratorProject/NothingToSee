package accenture.web.rest.testeDto;

public class PortDTO {
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    String id;
    int number;
    public PortDTO(String id, int number) {
        this.number = number;
        this.id = id;
    }
    public PortDTO() {}
}
