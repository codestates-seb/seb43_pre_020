package preproject.stackoverflow.auth.handler;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import preproject.stackoverflow.auth.utils.CustomAuthorityUtils;
import preproject.stackoverflow.exception.BusinessLogicException;
import preproject.stackoverflow.exception.ExceptionCode;
import preproject.stackoverflow.member.entity.Member;
import preproject.stackoverflow.member.repository.MemberRepository;
import preproject.stackoverflow.member.service.MemberService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URL;
import java.util.Optional;

@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final CustomAuthorityUtils authorityUtils;
    private final MemberRepository memberRepository;
    private final AuthenticationSuccessHandlerUtils authenticationSuccessHandlerUtils;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Member member = saveMember(oAuth2User);
        authenticationSuccessHandlerUtils.setLoginTime(member);
        String accessToken = authenticationSuccessHandlerUtils.delegateAccessToken(member);
        String refreshToken = authenticationSuccessHandlerUtils.delegateRefreshToken(member);

        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);
    }

    private Member saveMember(OAuth2User oAuth2User) {
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        Member member = new Member();
        member.setEmail(email);
        member.setDisplayName(name);
        member.setRoles(authorityUtils.getRoles());
        if (oAuth2User.getAuthorities().stream().anyMatch(grantedAuthority -> grantedAuthority.getAuthority().contains("google"))) {
            member.setOAuth2Status(Member.OAuth2Status.GOOGLE);
        }
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isPresent()) {
            Member findMember = optionalMember.get();
            if (findMember.getOAuth2Status() != member.getOAuth2Status()) {
                throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
            } else {
                findMember.setDisplayName(name);
                return findMember;
            }
        } else {
            return memberRepository.save(member);
        }
    }
}
