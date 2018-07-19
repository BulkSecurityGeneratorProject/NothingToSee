package accenture.web.rest.testeDto;

import java.util.List;

public class BoardDTO {
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

    public List<PortDTO> getPorts() {
        return ports;
    }

    public void setPorts(List<PortDTO> ports) {
        this.ports = ports;
    }

    String id;
    String name;
    List<PortDTO> ports;
    public BoardDTO(String name, List<PortDTO> ports, String id) {
        this.name = name;
        this.ports = ports;
        this.id = id;
    }
}
