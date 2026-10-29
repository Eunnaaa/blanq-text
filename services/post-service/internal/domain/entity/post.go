package entity

import "time"

type Post struct {
	ID             string      `json:"id"`
	AuthorID       string      `json:"author_id"`
	Content        string      `json:"content"`
	ReplyToPostID  *string     `json:"reply_to_post_id,omitempty"`
	RootPostID     *string     `json:"root_post_id,omitempty"`
	DepthLevel     int         `json:"depth_level"`
	RepliesCount   int         `json:"replies_count"`
	RepostsCount   int         `json:"reposts_count"`
	ReactionsCount int         `json:"reactions_count"`
	Media          []PostMedia `json:"media,omitempty"`
	IsDeleted      bool        `json:"is_deleted"`
	CreatedAt      time.Time   `json:"created_at"`
	UpdatedAt      time.Time   `json:"updated_at"`
}

type PostMedia struct {
	ID        string `json:"id"`
	PostID    string `json:"post_id"`
	MediaURL  string `json:"media_url"`
	MediaType string `json:"media_type"`
	Width     *int   `json:"width,omitempty"`
	Height    *int   `json:"height,omitempty"`
	Order     int    `json:"order"`
}
