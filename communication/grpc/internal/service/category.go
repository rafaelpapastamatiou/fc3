package service

import (
	"context"
	"io"

	"github.com/rafaelpapastamatiou/fc3/communication/grpc/internal/database"
	"github.com/rafaelpapastamatiou/fc3/communication/grpc/internal/pb"
)

type CategoryService struct {
	pb.UnimplementedCategoryServiceServer
	CategoryDB *database.Category
}

func NewCategoryService(categoryDb *database.Category) *CategoryService {
	return &CategoryService{CategoryDB: categoryDb}
}

func (c *CategoryService) Create(
	ctx context.Context,
	input *pb.CreateCategoryRequest,
) (*pb.Category, error) {
	category, err := c.CategoryDB.Create(input.Name, input.Description)
	if err != nil {
		return nil, err
	}

	categoryResponse := &pb.Category{
		Id:          category.ID,
		Name:        category.Name,
		Description: category.Description,
	}

	return categoryResponse, nil
}

func (c *CategoryService) List(
	ctx context.Context,
	input *pb.Blank,
) (*pb.CategoryList, error) {
	categories, err := c.CategoryDB.FindAll()
	if err != nil {
		return nil, err
	}

	var categoriesResponse []*pb.Category

	for _, category := range categories {
		c := &pb.Category{
			Id:          category.ID,
			Name:        category.Name,
			Description: category.Description,
		}

		categoriesResponse = append(categoriesResponse, c)
	}

	return &pb.CategoryList{Categories: categoriesResponse}, nil
}

func (c *CategoryService) GetById(
	ctx context.Context,
	input *pb.GetCategoryByIdRequest,
) (*pb.Category, error) {
	category, err := c.CategoryDB.FindById(input.Id)
	if err != nil {
		return nil, err
	}

	categoryResponse := &pb.Category{
		Id:          category.ID,
		Name:        category.Name,
		Description: category.Description,
	}

	return categoryResponse, nil
}

func (c *CategoryService) CreateCategoryStream(
	stream pb.CategoryService_CreateCategoryStreamServer,
) error {
	categories := &pb.CategoryList{}

	for {
		category, err := stream.Recv()
		if err == io.EOF {
			return stream.SendAndClose(categories)
		}

		if err != nil {
			return err
		}

		categoryResult, err := c.CategoryDB.Create(category.Name, category.Description)
		if err != nil {
			return err
		}

		categoryResponse := &pb.Category{
			Id:          categoryResult.ID,
			Name:        categoryResult.Name,
			Description: categoryResult.Description,
		}

		categories.Categories = append(categories.Categories, categoryResponse)
	}
}

func (c *CategoryService) CreateBidirectionalCategoryStream(
	stream pb.CategoryService_CreateBidirectionalCategoryStreamServer,
) error {
	for {
		category, err := stream.Recv()
		if err == io.EOF {
			return nil
		}

		if err != nil {
			return err
		}

		categoryResult, err := c.CategoryDB.Create(category.Name, category.Description)
		if err != nil {
			return err
		}

		categoryResponse := &pb.Category{
			Id:          categoryResult.ID,
			Name:        categoryResult.Name,
			Description: categoryResult.Description,
		}

		err = stream.Send(categoryResponse)
		if err != nil {
			return err
		}
	}
}
