package entity

import "time"

type User struct {
	ID           string    `json:"id"`
	Username     string    `json:"username"`
	DisplayName  string    `json:"display_name"`
	Email        string    `json:"email"`
	PasswordHash string    `json:"-"`
	GoogleID     *string   `json:"google_id,omitempty"`
	Bio          string    `json:"bio"`
	AvatarURL    *string   `json:"avatar_url,omitempty"`
	IsVerified   bool      `json:"is_verified"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}
