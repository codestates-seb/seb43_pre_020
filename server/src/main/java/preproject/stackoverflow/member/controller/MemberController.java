package preproject.stackoverflow.member.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
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

    @PatchMapping(path = "/{member-id}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> patchMember(@Positive @PathVariable("member-id") long memberId,
                                         @Valid @RequestPart MemberDTO.Patch memberPatchDto,
                                         @RequestPart MultipartFile memberImage){
        memberPatchDto.setMemberId(memberId);
        Member member = memberService.updateMember(mapper.memberPatchDtoToMember(memberPatchDto), memberImage);
        return new ResponseEntity<>(mapper.memberToMemberResponseDTO(member), HttpStatus.OK);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity<?> getMember(@Positive @PathVariable("member-id") long memberId){
        Member member = memberService.findMember(memberId);
        return new ResponseEntity<>(mapper.memberToMemberResponseDTO(member), HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity<?> deleteMember(@Positive @PathVariable("member-id") long memberId){
        memberService.deleteMember(memberId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
