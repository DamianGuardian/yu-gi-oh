using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using TrainerApi;

namespace TrainerApi.Services;

public class TrainerService : TrainerApi.TrainerService.TrainerServiceBase
{
    public override async Task<TrainerResponse> GetTrainer(TrainerByIdRequest request, ServerCallContext context)
    {
        return new TrainerResponse {
            Id = Guid.NewGuid().ToString(),
            Name = "Salvador Rojas",
            Age = 21,
            Birthdate = Timestamp.FromDateTime(DateTime.UtcNow),
            CreatedAt = Timestamp.FromDateTime(DateTime.UtcNow),
            Medals = 
            { 
                new Medals { Region = "MX", Type = MedalType.Gold},
                new Medals { Region = "MX", Type = MedalType.Silver}
            }
        };
    }
}