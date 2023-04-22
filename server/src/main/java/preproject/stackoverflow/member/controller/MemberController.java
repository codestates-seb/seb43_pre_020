package preproject.stackoverflow.member.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import preproject.stackoverflow.member.dto.MemberDTO;
import preproject.stackoverflow.member.entity.Member;
import preproject.stackoverflow.member.mapper.MemberMapper;
import preproject.stackoverflow.member.service.MemberService;
import preproject.stackoverflow.utils.UriCreator;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

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
//        return new ResponseEntity<>(HttpStatus.OK);
    }

}
