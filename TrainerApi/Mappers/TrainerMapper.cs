using TrainerApi.Infrastructure.Documents; 
using TrainerApi.Models; 

namespace TrainerApi.Mappers;

public static class TrainerMapper
{

    public static Trainer? ToModel(this TrainerDocument trainerDocument)
    {

        if (trainerDocument == null)
            return null;

        return new Trainer
        {
            Id = trainerDocument.Id,
            Name = trainerDocument.Name,
            Age = trainerDocument.Age,
            Birthdate = trainerDocument.Birthdate,
            CreatedAt = trainerDocument.CreatedAt,
            Medals = trainerDocument.Medals.Select(s => new Medal
            {
                Region = s.Region, 
                Type = (Models.MedalType)(int)s.Type 
            }).ToList()
        };
    }

}