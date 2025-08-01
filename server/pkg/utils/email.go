package utils

import (
	"fmt"
	"os"

	"github.com/resend/resend-go/v2"
)

func SendVerificationMail(to string, token string) error {

	client := resend.NewClient(os.Getenv("RESEND_API_KEY"))

	baseURL := os.Getenv("APP_BASE_URL")
	if baseURL == "" {
		baseURL = "http://localhost:8000/"
	}

	verificationLink := fmt.Sprintf("%s/verify?token=%s", baseURL, token)

	params := &resend.SendEmailRequest{
		From:    "onboarding@resend.dev",
		To:      []string{to},
		Subject: "Verify your email address",
		Html: fmt.Sprintf(`
			<h2>Welcome to YourApp 🎉</h2>
			<p>Please click the link below to verify your email address:</p>
			<a href="%s">Verification Link</a>
			<p>This link will expire in 1 hour.</p>
		`, verificationLink),
	}

	_, err := client.Emails.Send(params)
	if err != nil {
		return fmt.Errorf("failed to send verification email: %v", err)
	}

	return nil
}
