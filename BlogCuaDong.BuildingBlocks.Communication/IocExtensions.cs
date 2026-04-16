using BlogCuaDong.BuildingBlocks.Communication.Synchronous;
using Microsoft.Extensions.DependencyInjection;

namespace BlogCuaDong.BuildingBlocks.Communication;

public static class IocExtensions
{
    public static IServiceCollection AddInMemoryCommunication(this IServiceCollection services)
    {
        services.AddScoped<IServiceClient, InMemoryServiceClient>();
        services.AddScoped<IEventBus, InMemoryEventBus>();
        return services;
    }
}