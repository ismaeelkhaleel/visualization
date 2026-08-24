export const moveZeroesCode = [
  'class Solution {',
  '    public void moveZeroes(int[] nums) {',
  '        int write = 0;',
  '        for (int read = 0; read < nums.length; read++) {',
  '            if (nums[read] != 0) {',
  '                swap(nums, read, write);',
  '                write++;',
  '            }',
  '        }',
  '    }',
  '}',
]
