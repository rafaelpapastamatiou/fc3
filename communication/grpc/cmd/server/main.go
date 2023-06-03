package main

import (
	"database/sql"
	"net"

	_ "github.com/mattn/go-sqlite3"
	"github.com/rafaelpapastamatiou/fc3/communication/grpc/internal/database"
	"github.com/rafaelpapastamatiou/fc3/communication/grpc/internal/pb"
	"github.com/rafaelpapastamatiou/fc3/communication/grpc/internal/service"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func main() {
	db, err := sql.Open("sqlite3", "./db.sqlite")
	if err != nil {
		panic(err)
	}

	defer db.Close()

	categoryDb := database.NewCategory(db)

	categoryService := service.NewCategoryService(categoryDb)

	grpcServer := grpc.NewServer()
	reflection.Register(grpcServer)

	pb.RegisterCategoryServiceServer(grpcServer, categoryService)

	listener, err := net.Listen("tcp", ":50051")
	if err != nil {
		panic(err)
	}

	err = grpcServer.Serve(listener)
	if err != nil {
		panic(err)
	}
}
