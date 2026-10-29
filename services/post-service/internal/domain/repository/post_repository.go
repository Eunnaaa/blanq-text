package repository

import (
	"context"
	"tbm/post-service/internal/domain/entity"
)

type PostRepository interface {
	Create(ctx context.Context, post *entity.Post) error
	GetByID(ctx context.Context, id string) (*entity.Post, error)
	GetThreadTree(ctx context.Context, rootPostID string) ([]*entity.Post, error)
	GetFeedByAuthorIDs(ctx context.Context, authorIDs []string, cursor string, limit int) ([]*entity.Post, error)
	SoftDelete(ctx context.Context, id string) error
}
