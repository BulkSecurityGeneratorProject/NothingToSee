package accenture.web.rest.errors;

public class EquipmentChangeException extends RuntimeException{
    public EquipmentChangeException() {
        super("Equipamento não pode ser manobrado pois, equipamentos de destino e origem não são compativeis.");
    }
}
