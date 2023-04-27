package preproject.stackoverflow.auth.handler;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.transaction.annotation.Transactional;
import preproject.stackoverflow.auth.utils.CustomAuthorityUtils;
import preproject.stackoverflow.exception.BusinessLogicException;
import preproject.stackoverflow.exception.ExceptionCode;
import preproject.stackoverflow.member.entity.Member;
import preproject.stackoverflow.member.repository.MemberRepository;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final CustomAuthorityUtils authorityUtils;
    private final MemberRepository memberRepository;
    private final AuthenticationSuccessHandlerUtils authenticationSuccessHandlerUtils;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Member member = getOAuth2Member(oAuth2User, request);
        authenticationSuccessHandlerUtils.setLoginTime(member);
        String accessToken = authenticationSuccessHandlerUtils.delegateAccessToken(member);
        String refreshToken = authenticationSuccessHandlerUtils.delegateRefreshToken(member);

        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);
    }

    private Member getOAuth2Member(OAuth2User oAuth2User, HttpServletRequest request) {
        Member member = new Member();
        System.out.println(oAuth2User);
        member.setRoles(authorityUtils.getRoles());

        if (request.getServletPath().endsWith("google")) {
            return getGoogleMember(oAuth2User, member);
        } else if (request.getServletPath().endsWith("github")) {
            return getGithubMember(oAuth2User, member);
        }
        throw new OAuth2AuthenticationException("OAuth2 Authentication Not Valid");
    }

    @Transactional
    private Member getGoogleMember(OAuth2User oAuth2User, Member member) {
        member.setOAuth2Status(Member.OAuth2Status.GOOGLE);
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isPresent()) {
            Member findMember = optionalMember.get();
            if (findMember.getOAuth2Status() != member.getOAuth2Status()) {
                throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
            } else {
                if(findMember.getMemberStatus()== Member.MemberStatus.MEMBER_QUIT) throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
                return findMember;
            }
        } else {
            member.setEmail(email);
            member.setDisplayName(name);
            return memberRepository.save(member);
        }
    }

    @Transactional
    private Member getGithubMember(OAuth2User oAuth2User, Member member) {
        member.setOAuth2Status(Member.OAuth2Status.GITHUB);
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("login");
        Long githubId = oAuth2User.<Integer>getAttribute("id").longValue();
        Optional<Member> optionalMember = memberRepository.findByGithubId(githubId);
        if (optionalMember.isPresent()) {
            Member findMember = optionalMember.get();
            if(findMember.getMemberStatus()== Member.MemberStatus.MEMBER_QUIT) throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
            return findMember;
        } else {
            member.setEmail(email);
            member.setDisplayName(name);
            member.setGithubId(githubId);
            return memberRepository.save(member);
        }
    }


}
