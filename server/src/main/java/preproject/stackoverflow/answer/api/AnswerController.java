package preproject.stackoverflow.answer.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import preproject.stackoverflow.answer.dto.AnswerPostDto;
import preproject.stackoverflow.answer.entity.Answer;
import preproject.stackoverflow.answer.mapper.AnswerMapper;
import preproject.stackoverflow.answer.service.AnswerService;
import preproject.stackoverflow.question.entity.Question;

import javax.validation.Valid;
import javax.validation.constraints.Positive ;
//import javax.validation.constraints.Positive long;
@RestController
@RequestMapping(" /questions/{question-id}/answers")
@Validated
public class AnswerController {
        private final AnswerMapper mapper;
        private final AnswerService answerService;


        public AnswerController(AnswerMapper mapper, AnswerService answerService){
                this.answerService = answerService;
                this.mapper = mapper;
        }
        @PostMapping
        public ResponseEntity<?> postAnswer(@Valid @RequestBody AnswerPostDto answerPostDto,
                                             @Positive @PathVariable("question-id") long questionId)
        {
                answerPostDto.setQuestionId(questionId);
                Answer answer = mapper.answerPostDtoToAnswer(answerPostDto);
                Answer savedAnswer = answerService.createAnswer(answer);

                return new ResponseEntity<>(  HttpStatus.CREATED);

        }
}
