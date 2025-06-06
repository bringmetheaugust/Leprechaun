// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.3.0
// - protoc             v4.24.4
// source: prop_group.proto

package prop_group_v1

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	emptypb "google.golang.org/protobuf/types/known/emptypb"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

const (
	PropertyGroupService_GetGroupListPrivate_FullMethodName = "/prop_group.PropertyGroupService/getGroupListPrivate"
	PropertyGroupService_CreateGroup_FullMethodName         = "/prop_group.PropertyGroupService/createGroup"
)

// PropertyGroupServiceClient is the client API for PropertyGroupService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type PropertyGroupServiceClient interface {
	GetGroupListPrivate(ctx context.Context, in *emptypb.Empty, opts ...grpc.CallOption) (*PropertyGroupListPreview, error)
	CreateGroup(ctx context.Context, in *PropertyGroupCreate, opts ...grpc.CallOption) (*PropertyGroup, error)
}

type propertyGroupServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewPropertyGroupServiceClient(cc grpc.ClientConnInterface) PropertyGroupServiceClient {
	return &propertyGroupServiceClient{cc}
}

func (c *propertyGroupServiceClient) GetGroupListPrivate(ctx context.Context, in *emptypb.Empty, opts ...grpc.CallOption) (*PropertyGroupListPreview, error) {
	out := new(PropertyGroupListPreview)
	err := c.cc.Invoke(ctx, PropertyGroupService_GetGroupListPrivate_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *propertyGroupServiceClient) CreateGroup(ctx context.Context, in *PropertyGroupCreate, opts ...grpc.CallOption) (*PropertyGroup, error) {
	out := new(PropertyGroup)
	err := c.cc.Invoke(ctx, PropertyGroupService_CreateGroup_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// PropertyGroupServiceServer is the server API for PropertyGroupService service.
// All implementations must embed UnimplementedPropertyGroupServiceServer
// for forward compatibility
type PropertyGroupServiceServer interface {
	GetGroupListPrivate(context.Context, *emptypb.Empty) (*PropertyGroupListPreview, error)
	CreateGroup(context.Context, *PropertyGroupCreate) (*PropertyGroup, error)
	mustEmbedUnimplementedPropertyGroupServiceServer()
}

// UnimplementedPropertyGroupServiceServer must be embedded to have forward compatible implementations.
type UnimplementedPropertyGroupServiceServer struct {
}

func (UnimplementedPropertyGroupServiceServer) GetGroupListPrivate(context.Context, *emptypb.Empty) (*PropertyGroupListPreview, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetGroupListPrivate not implemented")
}
func (UnimplementedPropertyGroupServiceServer) CreateGroup(context.Context, *PropertyGroupCreate) (*PropertyGroup, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CreateGroup not implemented")
}
func (UnimplementedPropertyGroupServiceServer) mustEmbedUnimplementedPropertyGroupServiceServer() {}

// UnsafePropertyGroupServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to PropertyGroupServiceServer will
// result in compilation errors.
type UnsafePropertyGroupServiceServer interface {
	mustEmbedUnimplementedPropertyGroupServiceServer()
}

func RegisterPropertyGroupServiceServer(s grpc.ServiceRegistrar, srv PropertyGroupServiceServer) {
	s.RegisterService(&PropertyGroupService_ServiceDesc, srv)
}

func _PropertyGroupService_GetGroupListPrivate_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(emptypb.Empty)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(PropertyGroupServiceServer).GetGroupListPrivate(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: PropertyGroupService_GetGroupListPrivate_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(PropertyGroupServiceServer).GetGroupListPrivate(ctx, req.(*emptypb.Empty))
	}
	return interceptor(ctx, in, info, handler)
}

func _PropertyGroupService_CreateGroup_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(PropertyGroupCreate)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(PropertyGroupServiceServer).CreateGroup(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: PropertyGroupService_CreateGroup_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(PropertyGroupServiceServer).CreateGroup(ctx, req.(*PropertyGroupCreate))
	}
	return interceptor(ctx, in, info, handler)
}

// PropertyGroupService_ServiceDesc is the grpc.ServiceDesc for PropertyGroupService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var PropertyGroupService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "prop_group.PropertyGroupService",
	HandlerType: (*PropertyGroupServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "getGroupListPrivate",
			Handler:    _PropertyGroupService_GetGroupListPrivate_Handler,
		},
		{
			MethodName: "createGroup",
			Handler:    _PropertyGroupService_CreateGroup_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "prop_group.proto",
}
