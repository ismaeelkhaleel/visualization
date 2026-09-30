export const productExceptSelfCode = [
  'class Solution {',
  '    public int[] productExceptSelf(int[] nums) {',
  '        int n = nums.length;',
  '        int[] ans = new int[n];',
  '        int prefix = 1;',
  '        for (int i = 0; i < n; i++) {',
  '            ans[i] = prefix;',
  '            prefix *= nums[i];',
  '        }',
  '        int suffix = 1;',
  '        for (int i = n - 1; i >= 0; i--) {',
  '            ans[i] *= suffix;',
  '            suffix *= nums[i];',
  '        }',
  '        return ans;',
  '    }',
  '}',
]

export const removeDuplicatesCode = [
  'class Solution {',
  '    public int removeDuplicates(int[] nums) {',
  '        int write = 1;',
  '        for (int read = 1; read < nums.length; read++) {',
  '            if (nums[read] != nums[write - 1]) {',
  '                nums[write] = nums[read];',
  '                write++;',
  '            }',
  '        }',
  '        return write;',
  '    }',
  '}',
]

export const rotateArrayCode = [
  'class Solution {',
  '    public void rotate(int[] nums, int k) {',
  '        k %= nums.length;',
  '        reverse(nums, 0, nums.length - 1);',
  '        reverse(nums, 0, k - 1);',
  '        reverse(nums, k, nums.length - 1);',
  '    }',
  '}',
]

export const sortColorsCode = [
  'class Solution {',
  '    public void sortColors(int[] nums) {',
  '        int low = 0, mid = 0, high = nums.length - 1;',
  '        while (mid <= high) {',
  '            if (nums[mid] == 0) swap(nums, low++, mid++);',
  '            else if (nums[mid] == 1) mid++;',
  '            else swap(nums, mid, high--);',
  '        }',
  '    }',
  '}',
]

export const majorityElementCode = [
  'class Solution {',
  '    public int majorityElement(int[] nums) {',
  '        int candidate = 0, count = 0;',
  '        for (int num : nums) {',
  '            if (count == 0) candidate = num;',
  '            count += (num == candidate) ? 1 : -1;',
  '        }',
  '        return candidate;',
  '    }',
  '}',
]

export const missingNumberCode = [
  'class Solution {',
  '    public int missingNumber(int[] nums) {',
  '        int missing = nums.length;',
  '        for (int i = 0; i < nums.length; i++) {',
  '            missing ^= i;',
  '            missing ^= nums[i];',
  '        }',
  '        return missing;',
  '    }',
  '}',
]

export const pivotIndexCode = [
  'class Solution {',
  '    public int pivotIndex(int[] nums) {',
  '        int total = 0, left = 0;',
  '        for (int num : nums) total += num;',
  '        for (int i = 0; i < nums.length; i++) {',
  '            if (left == total - left - nums[i]) return i;',
  '            left += nums[i];',
  '        }',
  '        return -1;',
  '    }',
  '}',
]

export const runningSumCode = [
  'class Solution {',
  '    public int[] runningSum(int[] nums) {',
  '        for (int i = 1; i < nums.length; i++) {',
  '            nums[i] += nums[i - 1];',
  '        }',
  '        return nums;',
  '    }',
  '}',
]

export const sortedSquaresCode = [
  'class Solution {',
  '    public int[] sortedSquares(int[] nums) {',
  '        int left = 0, right = nums.length - 1;',
  '        int[] ans = new int[nums.length];',
  '        for (int pos = nums.length - 1; pos >= 0; pos--) {',
  '            if (Math.abs(nums[left]) > Math.abs(nums[right]))',
  '                ans[pos] = nums[left] * nums[left++];',
  '            else ans[pos] = nums[right] * nums[right--];',
  '        }',
  '        return ans;',
  '    }',
  '}',
]

export const intersectionCode = [
  'class Solution {',
  '    public int[] intersection(int[] nums1, int[] nums2) {',
  '        Set<Integer> seen = new HashSet<>();',
  '        Set<Integer> out = new HashSet<>();',
  '        for (int n : nums1) seen.add(n);',
  '        for (int n : nums2) if (seen.contains(n)) out.add(n);',
  '        return out.stream().mapToInt(Integer::intValue).toArray();',
  '    }',
  '}',
]

export const intersectionIICode = [
  'class Solution {',
  '    public int[] intersect(int[] nums1, int[] nums2) {',
  '        Map<Integer, Integer> count = new HashMap<>();',
  '        List<Integer> out = new ArrayList<>();',
  '        for (int n : nums1) count.put(n, count.getOrDefault(n, 0) + 1);',
  '        for (int n : nums2) {',
  '            if (count.getOrDefault(n, 0) > 0) {',
  '                out.add(n);',
  '                count.put(n, count.get(n) - 1);',
  '            }',
  '        }',
  '        return out.stream().mapToInt(Integer::intValue).toArray();',
  '    }',
  '}',
]

export const mergeIntervalsCode = [
  'class Solution {',
  '    public int[][] merge(int[][] intervals) {',
  '        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);',
  '        List<int[]> merged = new ArrayList<>();',
  '        for (int[] next : intervals) {',
  '            if (merged.isEmpty() || merged.get(merged.size()-1)[1] < next[0])',
  '                merged.add(next);',
  '            else',
  '                merged.get(merged.size()-1)[1] = Math.max(merged.get(merged.size()-1)[1], next[1]);',
  '        }',
  '        return merged.toArray(new int[merged.size()][]);',
  '    }',
  '}',
]

export const subarraySumCode = [
  'class Solution {',
  '    public int subarraySum(int[] nums, int k) {',
  '        Map<Integer, Integer> prefix = new HashMap<>();',
  '        prefix.put(0, 1);',
  '        int sum = 0, count = 0;',
  '        for (int num : nums) {',
  '            sum += num;',
  '            count += prefix.getOrDefault(sum - k, 0);',
  '            prefix.put(sum, prefix.getOrDefault(sum, 0) + 1);',
  '        }',
  '        return count;',
  '    }',
  '}',
]

export const threeSumCode = [
  'class Solution {',
  '    public List<List<Integer>> threeSum(int[] nums) {',
  '        Arrays.sort(nums);',
  '        List<List<Integer>> ans = new ArrayList<>();',
  '        for (int i = 0; i < nums.length - 2; i++) {',
  '            if (i > 0 && nums[i] == nums[i - 1]) continue;',
  '            int left = i + 1, right = nums.length - 1;',
  '            while (left < right) {',
  '                int sum = nums[i] + nums[left] + nums[right];',
  '                if (sum == 0) { ans.add(List.of(nums[i], nums[left], nums[right])); left++; right--; }',
  '                else if (sum < 0) left++;',
  '                else right--;',
  '            }',
  '        }',
  '        return ans;',
  '    }',
  '}',
]
