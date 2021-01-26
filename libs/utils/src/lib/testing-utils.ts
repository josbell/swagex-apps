export type StrictMockClass<actualClass> = {
  [K in keyof actualClass]: actualClass[K] extends (...args: infer A) => infer B
    ? actualClass[K] & jest.Mock<B, A>
    : actualClass[K];
};

export type MockClass<actualClass> = Partial<StrictMockClass<actualClass>>;
