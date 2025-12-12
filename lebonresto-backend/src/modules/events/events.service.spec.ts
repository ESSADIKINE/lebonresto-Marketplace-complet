import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { SupabaseService } from '../../database/supabase.service';

const mockSupabaseClient = {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    gte: jest.fn().mockReturnThis(),
    lte: jest.fn().mockReturnThis(),
    or: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    single: jest.fn(),
    getClient: jest.fn().mockReturnThis(),
};

const mockSupabaseService = {
    getClient: jest.fn(() => mockSupabaseClient),
};

describe('EventsService', () => {
    let service: EventsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EventsService,
                {
                    provide: SupabaseService,
                    useValue: mockSupabaseService,
                },
            ],
        }).compile();

        service = module.get<EventsService>(EventsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('findPromotions', () => {
        it('should query for active promotions', async () => {
            mockSupabaseClient.single.mockResolvedValueOnce({ data: [], error: null });
            // Mock the chain return for findPromotions
            // We need to ensure the chain returns an object with 'data'
            const mockData = [{ id: '1', title: 'Promo 1', is_promo: true }];
            // The chain in findPromotions is: getClient -> from -> select -> eq -> or -> or -> order -> returns { data, error }
            // We need to mock the last call in the chain to return the promise

            // Resetting mocks to ensure clean state
            jest.clearAllMocks();

            // Setup the chain
            mockSupabaseClient.order.mockResolvedValueOnce({ data: mockData, error: null });

            const result = await service.findPromotions();

            expect(mockSupabaseService.getClient).toHaveBeenCalled();
            expect(mockSupabaseClient.from).toHaveBeenCalledWith('events');
            expect(mockSupabaseClient.select).toHaveBeenCalledWith('*, restaurant:restaurants(*)');
            expect(mockSupabaseClient.eq).toHaveBeenCalledWith('is_promo', true);
            // We can't easily test the exact string in OR without being very specific, but we check it was called
            expect(mockSupabaseClient.or).toHaveBeenCalledTimes(2);
            expect(mockSupabaseClient.order).toHaveBeenCalledWith('promo_end_at', { ascending: true });
            expect(result).toEqual(mockData);
        });
    });
});
