import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { getHours } from 'date-fns';
import iAppointmentsRepository from '../repositories/iAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvalibilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: iAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.FindAllInDayFromProvider(
      {
        provider_id,
        year,
        month,
        day,
      },
    );

    const hourStart = 8;
    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );
      return {
        hour,
        available: !hasAppointmentInHour,
      };
    });
    return availability;
  }
}

export default ListProviderDayAvalibilityService;
