package main

import (
	"context"
	"log"
	"net"

	"github.com/pranoyk/polygot-grpc/go-server/addition"
	"google.golang.org/grpc"
)

type additionServer struct{
}

func (a *additionServer) Add(c context.Context, addRequest *addition.AddRequest) (*addition.AddResponse, error) {
	result := addRequest.Num1 + addRequest.Num2
	response := addition.AddResponse{
		Sum: int64(result),
	}
	return &response, nil
}

func newAddServer() *additionServer {
	return &additionServer{}
}

func main() {
	lis, err := net.Listen("tcp", "localhost:10001")
	if err != nil {
		log.Fatalf("failed to listen: %v ", err)
	}
	grpcServer := grpc.NewServer()
	addition.RegisterAdditionServer(grpcServer, newAddServer())
	log.Println("Listening at port 10001")
	grpcServer.Serve(lis)
}