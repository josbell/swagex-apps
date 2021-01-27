import { NewBookingPayload } from '@swagex/shared-models';

import { ClassBookingsService } from './class-bookings.service';
import { BookingStoreService } from './stores/booking-store.service';

export type StrictMockClass<actualClass> = {
  [K in keyof actualClass]: actualClass[K] extends (...args: infer A) => infer B
    ? actualClass[K] & jest.Mock<B, A>
    : actualClass[K];
};

export type MockClass<actualClass> = Partial<StrictMockClass<actualClass>>;

describe('ClassBookingsService', () => {
  let service: ClassBookingsService;
  let store: MockClass<BookingStoreService>;
  let payloadAdapterMock;
  let stripeServiceMock;
  let windowServiceMock;
  let router;
  let spinnerService;
  let api;
  let env;

  beforeEach(() => {
    payloadAdapterMock = {
      getNewBookingPayload: jest.fn()
    };
    stripeServiceMock = {
      redirectToCheckout: jest.fn()
    };
    windowServiceMock = {
      nativeWindow: {
        localStorage: { setItem: jest.fn() }
      }
    };
    router = { nagivate: jest.fn() };
    spinnerService = { show: jest.fn(), hide: jest.fn() };
    api = { createSession: jest.fn() };
    env = { webAppUrl: 'testUrl' };
    service = new ClassBookingsService(
      (store as any) as BookingStoreService,
      payloadAdapterMock,
      stripeServiceMock,
      windowServiceMock,
      router,
      spinnerService,
      api,
      env
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createCheckoutSession', () => {
    it('should call create session API with payment info', () => {
      const data = {
        stripeCustomerId: '',
        stripeSessionId: '',
        email: 'john@gmail.com',
        danceClassId: 'afro-fusion',
        danceClassDate: 'Tue Jan 18',
        danceClassTitle: 'Afro Fusion',
        danceClassTime: '8:00pm',
        spaceNumber: '1',
        metadata1: 'foo',
        metadata2: 'bar'
      };
      const { stripeCustomerId, stripeSessionId, ...expectedMeta } = {
        ...data
      };
      const expected = {
        lineItems: {
          name: 'Afro Fusion',
          amount: 1500,
          currency: 'usd',
          quantity: 1,
          images: ['testUrl/assets/images/dance-classes/afro-fusion.jpg'],
          description: 'Tue Jan 18, 8:00pm - Space Number: 1'
        },
        successRoute: 'payment-succeeded',
        cancelRoute: 'classes/afro-fusion/book',
        customerEmail: 'john@gmail.com',
        metadata: expectedMeta
      };
      service.createCheckoutSession((data as any) as NewBookingPayload);
      expect(api.createSession).toHaveBeenCalledWith(expected);
    });
  });
});
