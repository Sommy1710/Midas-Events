import {asyncHandler} from '../../lib/util.js';
import {Validator} from '../../lib/validator.js'
import { CreateEventRequest } from './../requests/create-event.request.js';
import * as eventService from '../services/event.service.js'



export const createNewEvent = asyncHandler(async (req, res) =>
{
    const validator = new Validator();
    const {errors, value} = validator.validate(CreateEventRequest, req.body);
    if (errors) throw new ValidationError("the request failed with the following errors", errors);
    await eventService.createEvent(value);

    return res.status(201).json({
        success: true,
        message: 'new event created'
    })
});

export const fetchAllEvents = asyncHandler(async(req, res) =>
{
      
    const events = Object.keys(req.query).length >=1 
    ? await eventService.getEvents(req.query)
    : await bookService.getEvents();

    return res.json({
        success: true,
        message: 'events retrieved',
        data: {
            events
        }
    })
})

export const fetchEvent = asyncHandler(async(req, res) =>
{
    
    const {id} = req.params;
    const event = await eventService.getEvent(id);
    return res.json({
        success: true,
        message: 'Event rerrieved',
        data: {
            event
        }
    })
});

export const updateSingleEvent = asyncHandler(async (req, res) =>
{
    const {id} = req.params;
    const Validator = new Validator()
    const {errors, value} = Validator.validate(CreateBookRequest, req.body);

    if (errors) throw new ValidationError('the request failed with the following errors', errors);
    await eventService.updateEvent(id, value);

    return res.json({
        success: true,
        message: "event updated"
    });
});

export const deleteSingleEvent = asyncHandler(async(req, res) =>
{
    const {id} = req.params;
    await bookService.deleteBook(id);
    res.json({
        success: true,
        message: "event deleted"
    });
});