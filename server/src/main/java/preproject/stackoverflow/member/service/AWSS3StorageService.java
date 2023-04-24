package preproject.stackoverflow.member.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Slf4j
@Service
public class AWSS3StorageService implements StorageService{
    @Getter
    @Value("${aws.s3.access-key}")
    private String accessKey;
    @Getter
    @Value("${aws.s3.secret-access-key}")
    private String secretKey;
    private AmazonS3 s3Client;
    private Regions clientRegion = Regions.AP_NORTHEAST_2;
    private String bucket = "preproject-stackoverflow-bombom";

    @PostConstruct
    private void createS3Client() {
        AWSCredentials awsCredentials = new BasicAWSCredentials(accessKey, secretKey);
        this.s3Client = AmazonS3ClientBuilder
                .standard()
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .withRegion(clientRegion)
                .build();
    }
    @Override
    public String store(MultipartFile image) {
        UUID uuid = UUID.randomUUID();
        String uploadImageName = uuid + "_" + image.getOriginalFilename();
        try {
            InputStream inputStream = image.getInputStream();
            return upload(inputStream, uploadImageName, image.getContentType(), image.getSize());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private String upload(InputStream is, String key, String contentType, long contentLength) {
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(contentType);
        objectMetadata.setContentLength(contentLength);
        return uploadToS3(new PutObjectRequest(this.bucket, key, is, objectMetadata));
    }

    private String uploadToS3(PutObjectRequest putObjectRequest) {
        try {
            this.s3Client.putObject(putObjectRequest);
            log.info("{} upload complete", putObjectRequest.getKey());
            return putObjectRequest.getKey();
        } catch (AmazonServiceException e) {
            log.error("# AWS S3 error", e);
        } catch (SdkClientException e) {
            log.error("# AWS S3 error", e);
        } catch (Exception e) {
            log.error("# AWS S3 error", e);
        }
        return null;
    }
    public void delete(String key) {
        try {
            DeleteObjectRequest deleteObjectRequest = new DeleteObjectRequest(this.bucket, key);
            this.s3Client.deleteObject(deleteObjectRequest);
            log.info("{}, deletion complete", key);
        } catch (AmazonServiceException e) {
            log.error("# AWS S3 error", e);
        } catch (SdkClientException e) {
            log.error("# AWS S3 error", e);
        }
    }
}
