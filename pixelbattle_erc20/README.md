# ERC20

---
## ERC20 구조 정리
- IERC20.sol - 인터페이스 
- ERC20.sol - 베이스
- extensions/*.sol - 토큰발행,소각,송수신 정지 등등 추가 기능 구현
- presets/ERC20PresetFixedSupply.sol - 고정 발행량을 사용
- presets/ERC20PresetMinterSupply.sol - 동적 발행 및 송수신 정지 등의 기능 포함 
- utils/*.sol - 구현에서 사용할 유틸리티 


---
## 기능
### 공통 : [표준] ERC20
- 자리수 decimals() = 18
- transfer 
- allowance
- approve
- transferFrom
- increaseAllowance
- decreaseAllowance
- mint
- _beforeTokenTransfer
- _afterTokenTransfer

### ERC20PresetMinterPauser [표준] ERC20 동적 발행 및 송수신 정지 등의 기능 포함
- mint
- pause
- unpause
- _beforeTokenTransfer

### 소각 : [표준] ERC20Burnable
- burn
- burnFrom

### 정지 : [표준] ERC20Pausable
- whenNotPaused
- whenPaused
- paused
- Unpaused

### 권한 : [표준] AccessControlEnumerable

---

## 커스텀마이즈

### 일반 보상 방식
```
contract ERC20WithMinerReward is ERC20 {
    constructor() public ERC20("Reward", "RWD") {}

    function mintMinerReward() public {
        _mint(block.coinbase, 1000);
    }
}

```

### 스테이블 구성 방식
```
contract MinerRewardMinter {
    ERC20PresetMinterPauser _token;

    constructor(ERC20PresetMinterPauser token) public {
        _token = token;
    }

    function mintMinerReward() public {
        _token.mint(block.coinbase, 1000);
    }
}
```

### 자동 보상 시스템
```
contract ERC20WithAutoMinerReward is ERC20 {
    constructor() public ERC20("Reward", "RWD") {}

    function _mintMinerReward() internal {
        _mint(block.coinbase, 1000);
    }

    function _beforeTokenTransfer(address from, address to, uint256 value) internal virtual override {
        _mintMinerReward();
        super._beforeTokenTransfer(from, to, value);
    }
}
```

---
### 테스트 결과
- https://mumbai.polygonscan.com/token/0x562f7c74ab19457C21e6ad4E1dEC6FB2A8E9e613