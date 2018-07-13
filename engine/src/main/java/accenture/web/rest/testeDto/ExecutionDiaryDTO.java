package accenture.web.rest.testeDto;

public class ExecutionDiaryDTO {
    String id;
    String name;

    public ExecutionDiaryDTO( String name, String id ) {
        this.name = name;
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    @Override
    public String toString() {
        return "ExecutionDiaryDTO{" +
            "name='" + name + '\'' +
            ", id='" + id + '\'' +
            "}";
    }
}
