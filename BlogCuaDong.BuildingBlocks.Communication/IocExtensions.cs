using BlogCuaDong.BuildingBlocks.Communication.Synchronous;
using Microsoft.Extensions.DependencyInjection;

namespace BlogCuaDong.BuildingBlocks.Communication;

public static class IocExtensions
{
    public static IServiceCollection AddInMemoryEventBus(this IServiceCollection services)
    {
        services.AddScoped<IEventBus, InMemoryEventBus>();
        return services;
    }
}