package accenture.web.rest;

import accenture.web.rest.errors.*;
import accenture.web.rest.testeDto.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

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
    public ResponseEntity<List<EquipmentDTO>> getEquipments(java.lang.String cnl, java.lang.String at, java.lang.String executionDiaryId) {
        List<EquipmentDTO>  equipments = this.searchForEquipments(cnl, at, executionDiaryId);
        return new ResponseEntity<List<EquipmentDTO>>(equipments,  HttpStatus.CREATED);
    }


    /**
     * POST  /users  : Creates a new user.
     * <p>
     * Creates a new user if the login and email are not already used, and sends an
     * mail with an activation link.
     * The user needs to be activated on creation.
     *
     * @param userDTO the user to create
     * @return the ResponseEntity with status 201 (Created) and with body the new user, or with status 400 (Bad Request) if the login or email is already in use
     * @throws URISyntaxException if the Location URI syntax is incorrect
     * @throws BadRequestAlertException 400 (Bad Request) if the login or email is already in use
     */
    @PostMapping("/massivePlanning/simulation")
    public ResponseEntity<List<Map<String, String>>> simulation(@Valid @RequestBody MassivePlanningDTO massivePlanning)  {
        List<Map<String, String>> boardChangeDTOS = new ArrayList<>();
        for(BoardChangeDTO boardChangeDTO: massivePlanning.getBoardsChange()) {
            Map<String, String> incompatible = new HashMap<>();
            incompatible.put("sourceBoardId", boardChangeDTO.getSourceBoardId());
            incompatible.put("targetBoardId", boardChangeDTO.getTargetBoardId());
            boardChangeDTOS.add(incompatible);
        }
        return new ResponseEntity<List<Map<String, String>>>(boardChangeDTOS, HttpStatus.CREATED);
    }

    private List<EquipmentDTO> searchForEquipments(java.lang.String cnl, java.lang.String at, java.lang.String executionDiaryId) {
        List<PortDTO> ports1 = Arrays.asList( new PortDTO("asd", 1), new PortDTO("asdasd", 5), new PortDTO("as123d", 1) );
        List<PortDTO> ports2 = Arrays.asList( new PortDTO("a2", 1), new PortDTO("asdasd", 5), new PortDTO("as123d", 1) );
        List<PortDTO> ports3 = Arrays.asList( new PortDTO("as12d", 1), new PortDTO("d", 5), new PortDTO("asd1", 1) );

        List<EquipmentDTO>  equipments = new ArrayList<>();

        BoardDTO boardDTO1 = new BoardDTO("CTA-451-12-565", ports1, "1");
        BoardDTO boardDTO2 = new BoardDTO("CTA-451-12-56123", ports2, "2");
        BoardDTO boardDTO3 = new BoardDTO("CTA-451-2-565", ports3, "3a");
        List<BoardDTO> boardDTOS1 = Arrays.asList( boardDTO1, boardDTO2, boardDTO3 );

        BoardDTO boardDTO11 = new BoardDTO("CTA-OI", ports1, "s4");
        BoardDTO boardDTO22 = new BoardDTO("CTA-GOKU", ports2, "as5d");
        BoardDTO boardDTO33 = new BoardDTO("CTA-SOU", ports3, "1236");
        List<BoardDTO> boardDTOS2 = Arrays.asList( boardDTO11, boardDTO22, boardDTO33 );

        BoardDTO boardDTO14 = new BoardDTO("CTA-DARTH", ports1, "17");
        BoardDTO boardDTO24 = new BoardDTO("CTA-VADER", ports2, "1283");
        BoardDTO boardDTO34 = new BoardDTO("CTA-VANISHasdasd", ports3, "lol9");
        BoardDTO boardDTO345 = new BoardDTO("CTA-VANISHasd", ports3, "13211-23123");
        BoardDTO boardDTO341 = new BoardDTO("CTA-VANISHqe", ports2, "9022");
        BoardDTO boardDTO342 = new BoardDTO("CTA-VANISH123", ports3, "pp11");
        BoardDTO boardDTO343 = new BoardDTO("CTA-VANISH3", ports1, "gg12");
        BoardDTO boardDTO344 = new BoardDTO("CTA-VANISH3", ports2, "m13");
        BoardDTO boardDTO3451 = new BoardDTO("CTA-VANISH123", ports3, "DKKI14");

        List<BoardDTO> boardDTOS3 = Arrays.asList( boardDTO14, boardDTO24, boardDTO34, boardDTO345,boardDTO341,
            boardDTO342, boardDTO343, boardDTO3451, boardDTO344);

        equipments.add( new EquipmentDTO("Manobra", "Armario 1", boardDTOS1) );
        equipments.add( new EquipmentDTO("Manobra2", "Armario 2", boardDTOS2) );
        equipments.add( new EquipmentDTO("Manobra3", "Armario 3", boardDTOS3) );
        equipments.add( new EquipmentDTO("Manobra4", "Armario 4", boardDTOS3) );
        equipments.add( new EquipmentDTO("Manobra5", "Armario 5", boardDTOS2) );
        equipments.add( new EquipmentDTO("Manobra6", "Armario 6", boardDTOS1) );
        return equipments;
    }
}
