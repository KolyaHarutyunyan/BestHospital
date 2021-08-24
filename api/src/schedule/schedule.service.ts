import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongooseUtil } from '../util';
import { CreateScheduleDTO, UpdateScheduleDTO } from './dto';
import { ScheduleModel } from './schedule.model';

@Injectable()
export class ScheduleService {
  constructor(
    // private readonly addressService: AddressService,
    // private readonly sanitizer: ScheduleSanitizer,

  ) {
    this.model = ScheduleModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<any>;

  private mongooseUtil: MongooseUtil;

  async createSchedule(dto: CreateScheduleDTO, owner: string, onModel: string) {
    try {
      const findSchedule = await this.model.findOne({ owner });

      if (!findSchedule) {
        const schedule = new this.model({
          owner,
          onModel
        })
        for (var day in dto) {
          dto[day].map(val => {
            schedule[day].push(val)
          })
        }
        return await schedule.save();
      }
//
      for (var day in dto) {
        dto[day].map(val => {
          findSchedule[day].push(val)
        })
      }

      return await findSchedule.save();
    }
    catch (e) {
      console.log(e);
      this.mongooseUtil.checkDuplicateKey(e, 'Schedule already exists');
      throw e;
    }
    // const schedule = await this.model.findById('6120fd2e04abc764cc4b85d5');

    // schedule.monday.push({ from: "12.0", to: "13.30", available: true })
    // var d = new Date();
    // var n = d.getDay();
    // var now = 9 + "." + 30;
    // var weekdays = [
    //    Sunday: [hours: {open: 9.30, close: 12.00, 15.30,22.00],
    //     ["Monday", 8.30, 12.00, 15.30,19.00],
    //     ["Tuesday", 8.30, 12.00, 15.30,19.00],
    //     ["Wednesday", 8.30, 12.00, 15.30,19.00],
    //     ["Thursday", 8.30, 12.00, 15.30,19.00],
    //     ["Friday", 8.30, 11.30],
    //     ["Saturday"] // we are closed, sorry!
    // ];
    // var day = weekdays[n];


    // if (now > day[1] && now < day[2] || now > day[3] && now < day[4]) {
    //   document.write(now, '++++++++++++');
    //     document.write(day[2]);
    //    document.write("We're open right now!");
    // }
    //  else {
    //  	  document.write(now, '----------');
    //     document.write(day[2]);

    //     document.write("Sorry, we're closed!");
    // }
    // schedule.monday
    // await schedule.save();
    // return
  }

  async findOne(owner: string) {
    try {
      const schedule = await this.model
        .findOne({owner})
        .populate("owner");
        this.checkSchedule(schedule)
      return schedule
      // this.checkClient(clients[0]);
      // return this.sanitizer.sanitizeMany(clients);
    } catch (e) {
      throw e;
    }
  }

 async update(_id: string, dto: UpdateScheduleDTO) {
    try {
      const findSchedule = await this.model.findById({_id});
      this.checkSchedule(findSchedule);

      for (var day in dto) {
        dto[day].map(val => {
          findSchedule[day].map(obj=>{
            if(obj._id == val.id){
              obj.from = val.from;
              obj.to = val.to;
              obj.available = val.available
            }
          })
        })
      }
     return await findSchedule.save()
 
    } catch (e) {
      throw e;
    }
  }

 async remove(_id: string):Promise<String> {
    const schedule = await this.model.findByIdAndDelete({ _id });
    this.checkSchedule(schedule);
    return schedule._id;
  }
    /** if the client is not found, throws an exception */
    private checkSchedule(schedule: any) {
      if (!schedule) {
        throw new HttpException(
          'Schedule with this id was not found',
          HttpStatus.NOT_FOUND,
        );
      }
    }
}
