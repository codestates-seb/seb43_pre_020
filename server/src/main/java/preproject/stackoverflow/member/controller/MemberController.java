package preproject.stackoverflow.member.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import preproject.stackoverflow.dto.MultiResponseDTO;
import preproject.stackoverflow.member.dto.MemberDTO;
import preproject.stackoverflow.member.entity.Member;
import preproject.stackoverflow.member.mapper.MemberMapper;
import preproject.stackoverflow.member.service.MemberService;
import preproject.stackoverflow.question.dto.QuestionDTO;
import preproject.stackoverflow.utils.UriCreator;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/members")
@Validated
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper mapper;
    private final static String MEMBER_DEFAULT_URL = "/members";

    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity<?> postMember(@Valid @RequestBody MemberDTO.Post post) {
        Member member = memberService.createMember(mapper.memberPostDTOToMember(post));
        URI uri = UriCreator.createUri(MEMBER_DEFAULT_URL, member.getMemberId());
        return ResponseEntity.created(uri).build();
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity<?> patchMember(@Positive @PathVariable("member-id") long memberId,
                                         @Valid @RequestBody MemberDTO.Patch memberPatchDto){
        memberPatchDto.setMemberId(memberId);
        Member member = memberService.updateMember(mapper.memberPatchDtoToMember(memberPatchDto));
        return new ResponseEntity<>(mapper.memberToMemberResponseDTO(member), HttpStatus.OK);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity<?> getMember(@Positive @PathVariable("member-id") long memberId){
        Member member = memberService.findMember(memberId);
        return new ResponseEntity<>(mapper.memberToMemberResponseDTO(member), HttpStatus.OK);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity<?> getMembers(@RequestParam @Positive int page,
                                        @RequestParam @Positive int size){
        Page<Member> memberPage = memberService.findMembers(page, size);
        List<MemberDTO.Response> responses = mapper.membersToSimpleResponses(memberPage.getContent());
        // TODO : 피드백 필요. 리팩토링 코드(DTO 패키지)를 쓸지, MemberDTO에 똑같이 만들지.
        return ResponseEntity.ok(new MultiResponseDTO<>(responses, memberPage));
//        return new ResponseEntity<>(new QuestionDTO.ResponseList(simpleResponses, questionPage), HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity<?> deleteMember(@Positive @PathVariable("member-id") long memberId){
        memberService.deleteMember(memberId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
