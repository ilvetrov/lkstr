(function() {
  const blockGroups = document.querySelectorAll('[data-block-group]');
  let registeredGroups = [];

  for (let blockGroupIteration = 0; blockGroupIteration < blockGroups.length; blockGroupIteration++) {
    const blockGroup = blockGroups[blockGroupIteration],
          blockGroupName = blockGroup.getAttribute('data-block-group');
    if (registeredGroups.indexOf(blockGroupName) == -1) {
      registeredGroups.push(blockGroupName);
      registerGroup(blockGroupName);
    }
  }

  function registerGroup(blockGroupName) {
    const allBlocks = document.querySelectorAll(`[data-block-group="${blockGroupName}"]`),
          blockChangers = document.querySelectorAll(`[data-block-group-of-changer="${blockGroupName}"]`);
    
    for (let blockChangerIteration = 0; blockChangerIteration < blockChangers.length; blockChangerIteration++) {
      const blockChanger = blockChangers[blockChangerIteration],
            blockName = blockChanger.getAttribute('data-block-changer'),
            block = document.querySelector(`[data-changing-block="${blockName}"]`),
            mainBlockHiddenToBottom = block.classList.contains('hidden-to-bottom');
      
      blockChanger.addEventListener('click', () => {
        if (!blockChanger.classList.contains('active') && block.classList.contains('disabled')) {
          blockChanger.classList.add('active');

          for (let otherBlockChangerIteration = 0; otherBlockChangerIteration < blockChangers.length; otherBlockChangerIteration++) {
            const otherBlockChanger = blockChangers[otherBlockChangerIteration],
                  otherBlockChangerName = otherBlockChanger.getAttribute('data-block-changer');
            if (otherBlockChangerName !== blockName) {
              otherBlockChanger.classList.remove('active');
            }
          }
          block.classList.remove('disabled');
          setTimeout(() => {
            if (mainBlockHiddenToBottom) {
              block.classList.remove('hidden-to-bottom');
            }
            if (!mainBlockHiddenToBottom) {
              block.classList.remove('hidden-to-top');
            }
          }, 100);

          for (let otherBlockIteration = 0; otherBlockIteration < allBlocks.length; otherBlockIteration++) {
            const otherBlock = allBlocks[otherBlockIteration],
                  otherBlockName = otherBlock.getAttribute('data-changing-block');
            if (otherBlockName !== blockName) {
              if (!otherBlock.classList.contains('hidden-to-top') && !otherBlock.classList.contains('hidden-to-bottom')) {
                if (mainBlockHiddenToBottom) {
                  otherBlock.classList.add('hidden-to-top');
                }
                if (!mainBlockHiddenToBottom) {
                  otherBlock.classList.add('hidden-to-bottom');
                }
                setTimeout(() => {
                  otherBlock.classList.add('disabled');
                }, 410);
              }
            }
          }
        }
      });
    }
  }
}());