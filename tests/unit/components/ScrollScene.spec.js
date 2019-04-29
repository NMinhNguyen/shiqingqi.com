import { shallowMount, config } from "@vue/test-utils";
import ScrollScene from "@/components/ScrollScene.vue";

jest.mock("@/utils/scroll", () => ({
  calcProgress: jest.fn(() => "calcProgress"),
  createAnimation: jest.fn(() => "createAnimation")
}));

config.mocks["$vars"] = ScrollScene.vars();

const windowIntersectionObserver = window.IntersectionObserver;
const windowAddEventListener = window.addEventListener;
const windowRemoveEventListener = window.removeEventListener;

class MockObserver {
  static observe = jest.fn();
  static disconnect = jest.fn();
  static intersectCallback = () => {};

  constructor(callback) {
    MockObserver.intersectCallback = callback;
    this.observe = MockObserver.observe;
    this.disconnect = MockObserver.disconnect;
  }
}

describe("ScrollScene", () => {
  let windowEventListeners = {};
  let wrapper;

  beforeAll(() => {
    window.IntersectionObserver = MockObserver;
    window.addEventListener = jest.fn((event, callback) => {
      windowEventListeners[event] = callback;
    });
    window.removeEventListener = jest.fn();
  });

  afterAll(() => {
    window.IntersectionObserver = windowIntersectionObserver;
    window.addEventListener = windowAddEventListener;
    window.removeEventListener = windowRemoveEventListener;
  });

  describe("mounted", () => {
    beforeAll(() => {
      jest.clearAllMocks();
      wrapper = shallowMount(ScrollScene);
    });

    it("creates IntersectionObserver and observes scene", () => {
      expect(MockObserver.observe).toHaveBeenCalledWith(wrapper.element);
    });

    it("listens for resize and scroll events", () => {
      ["resize", "scroll"].forEach(event => {
        expect(window.addEventListener).toHaveBeenCalledWith(
          event,
          expect.any(Function)
        );
      });
    });
  });

  describe("beforeDestroy", () => {
    beforeAll(() => {
      jest.clearAllMocks();
      wrapper = shallowMount(ScrollScene);
      wrapper.destroy();
    });

    it("disconnects IntersectionObserver", () => {
      expect(MockObserver.disconnect).toHaveBeenCalled();
    });

    it("removes resize and scroll listeners", () => {
      ["resize", "scroll"].forEach(event => {
        expect(window.removeEventListener).toHaveBeenCalledWith(
          event,
          windowEventListeners[event]
        );
      });
    });
  });

  describe("event handlers", () => {
    let scrollMock;
    let slotProps;

    beforeAll(async () => {
      scrollMock = await import("@/utils/scroll");
      wrapper = shallowMount(ScrollScene, {
        scopedSlots: { default: props => (slotProps = props) }
      });
    });

    it("doesn't call resize callback without intersecting", () => {
      expect(scrollMock.calcProgress).not.toHaveBeenCalled();
    });

    it("calculate progress when intersecting and scrolling", () => {
      MockObserver.intersectCallback([{ isIntersecting: true }]);
      windowEventListeners.scroll();
      expect(scrollMock.calcProgress).toHaveBeenCalled();
    });

    it("passes correct params to calcProgress", () => {
      jest.useFakeTimers();
      MockObserver.intersectCallback([{ isIntersecting: true }]);

      jest
        .spyOn(wrapper.vm.$refs.scene, "offsetTop", "get")
        .mockImplementation(() => 100);
      wrapper.vm.$refs.scene.getBoundingClientRect = jest.fn(() => ({
        height: 500
      }));
      wrapper.vm.$refs.inner.getBoundingClientRect = jest.fn(() => ({
        height: 100
      }));

      windowEventListeners.resize();
      jest.runAllTimers();

      window.pageYOffset = 200;

      windowEventListeners.scroll();
      expect(scrollMock.calcProgress).toHaveBeenLastCalledWith({
        scroll: 200,
        offset: 100,
        height: 500,
        innerHeight: 100
      });
    });

    it("passes createAnimation result to slot", () => {
      expect(slotProps.getAnimate).toBe("createAnimation");
    });
  });
});
