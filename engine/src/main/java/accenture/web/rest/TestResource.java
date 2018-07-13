package accenture.web.rest;

import accenture.web.rest.testeDto.BoardDTO;
import accenture.web.rest.testeDto.EquipmentDTO;
import accenture.web.rest.testeDto.ExecutionDiaryDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TestResource {
    private final Logger log = LoggerFactory.getLogger(TestResource.class);
    /**
     * GET /users/:login : get the "login" user.
     *
     * @param
     * @return the ResponseEntity with status 200 (OK) and with body the "login" user, or with status 404 (Not Found)
     */
    @GetMapping("/executionDiaries")
    public ResponseEntity<List<ExecutionDiaryDTO>> getDiaries() {
        List<ExecutionDiaryDTO> diaries = searchForExecutionDiaries();
        return new ResponseEntity<List<ExecutionDiaryDTO>>(diaries,  HttpStatus.CREATED);
    }

    private List<ExecutionDiaryDTO> searchForExecutionDiaries() {
        List<ExecutionDiaryDTO>  diaries = new ArrayList<>();
        diaries.add( new ExecutionDiaryDTO("Manobra", "123") );
        diaries.add( new ExecutionDiaryDTO("Manobra2", "212") );
        diaries.add( new ExecutionDiaryDTO("Manobra3", "121") );
        diaries.add( new ExecutionDiaryDTO("Manobra4", "123") );
        diaries.add( new ExecutionDiaryDTO("Manobra5", "1asd") );
        diaries.add( new ExecutionDiaryDTO("Manobra6", "12413") );
        return diaries;
    }

    /**
     * GET /users/:login : get the "login" user.
     *
     * @param
     * @return the ResponseEntity with status 200 (OK) and with body the "login" user, or with status 404 (Not Found)
     */
    @GetMapping("/equipments")
    public ResponseEntity<List<EquipmentDTO>> getEquipments(String cnl,String at, String executionDiaryId) {
        List<EquipmentDTO>  equipments = this.searchForEquipments(cnl, at, executionDiaryId);
        return new ResponseEntity<List<EquipmentDTO>>(equipments,  HttpStatus.CREATED);
    }

    private List<EquipmentDTO> searchForEquipments(String cnl, String at, String executionDiaryId) {
        List<EquipmentDTO>  equipments = new ArrayList<>();

        BoardDTO boardDTO1 = new BoardDTO("Oi");
        BoardDTO boardDTO2 = new BoardDTO("Sou");
        BoardDTO boardDTO3 = new BoardDTO("Goku");
        List<BoardDTO> boardDTOS1 = Arrays.asList( boardDTO1, boardDTO2, boardDTO3 );

        BoardDTO boardDTO11 = new BoardDTO("Its");
        BoardDTO boardDTO22 = new BoardDTO("me");
        BoardDTO boardDTO33 = new BoardDTO("mario");
        List<BoardDTO> boardDTOS2 = Arrays.asList( boardDTO11, boardDTO22, boardDTO33 );

        BoardDTO boardDTO14 = new BoardDTO("die");
        BoardDTO boardDTO24 = new BoardDTO("die");
        BoardDTO boardDTO34 = new BoardDTO("again");
        List<BoardDTO> boardDTOS3 = Arrays.asList( boardDTO14, boardDTO24, boardDTO34 );

        equipments.add( new EquipmentDTO("Manobra", "123", boardDTOS1) );
        equipments.add( new EquipmentDTO("Manobra2", "212", boardDTOS2) );
        equipments.add( new EquipmentDTO("Manobra3", "121", boardDTOS3) );
        equipments.add( new EquipmentDTO("Manobra4", "123", boardDTOS3) );
        equipments.add( new EquipmentDTO("Manobra5", "1asd", boardDTOS2) );
        equipments.add( new EquipmentDTO("Manobra6", "12413", boardDTOS1) );
        return equipments;
    }
}
