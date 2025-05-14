using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TrainerApi.Infrastructure.Documents;
using TrainerApi.Models;
using TrainerApi.Infrastructure;
using TrainerApi.Mappers;

namespace TrainerApi.Repositories;

public class TrainerRepository : ITrainerRepository
{
    private readonly IMongoCollection<TrainerDocument> _TrainersCollection;

    public TrainerRepository(IMongoDatabase database, IOptions<MongoDBSettings> settings){
       _TrainersCollection = database.GetCollection<TrainerDocument>(settings.Value.TrainersCollectionName);
    }

    public async Task<Trainer?> GetByIdAsync(string id, CancellationToken cancellationToken)
    {
        var trainer = await _TrainersCollection.Find(t => t.Id == id).FirstOrDefaultAsync(cancellationToken);
        return trainer?.ToModel();
    }

}