import { shallowMount } from '@vue/test-utils';
import HelloWorld from '../../components/HelloWorld.vue';
import { vi } from 'vitest';

const user: {
  name: string;
  hobby: string[];
  addHobby: (arg0: string) => void;
  getHobbies: () => string[];
} = {
  name: '',
  hobby: [],
  addHobby: () => ({}),
  getHobbies: () => [],
};

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const message = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      props: { message },
    });
    expect(wrapper.text()).toMatch(message);
  });

  it('hello world component test', () => {
    const expected = 'test message';
    const wrapper = shallowMount(HelloWorld, {
      propsData: { message: expected },
    });
    expect(wrapper.text()).toContain(expected);
  });

  const fetchData = (num: number) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (num !== -1) {
          resolve('success');
        } else {
          reject('error');
        }
      }, 100);
    });
  };

  it('async/awaitのテスト（resolve1）', async () => {
    expect.assertions(1);
    const result = await fetchData(1);
    expect(result).toBe('success');
  });

  it('async/await（reject1）', async () => {
    expect.assertions(1);
    try {
      await fetchData(-1);
    } catch (e) {
      expect(e).toBe('error');
    }
  });

  it('async/awaitのテスト（resolve2）', async () => {
    expect.assertions(1);
    await expect(fetchData(1)).resolves.toBe('success');
  });

  it('async/await（reject2）', async () => {
    expect.assertions(1);
    await expect(fetchData(-1)).rejects.toBe('error');
  });

  beforeEach(() => {
    user.name = '山田太郎';
    user.addHobby = (hobby: string) => {
      user.hobby.push(hobby);
    };
    user.getHobbies = () => {
      return user.hobby;
    };
  });

  it('userのhobbyに値を追加する', () => {
    user.addHobby('アニメ');
    expect(user.hobby.length).toBe(1);

    const mockFunc = vi.fn();
    user.addHobby = mockFunc;

    user.addHobby('漫画');
    expect(user.hobby.length).toBe(1);

    expect(mockFunc).toHaveBeenCalled();
  });

  it('userのhobbyの値を取得する', () => {
    expect(user.getHobbies().length).toBe(1);

    const mockFunc = vi.fn(() => ['dummy']);
    user.getHobbies = mockFunc;

    expect(user.getHobbies()).toEqual(['dummy']);
  });
});
