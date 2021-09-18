class OptimizedScroll {
  static namePrefix = 'scroll-optimized-';
  static allEvents = [];
  
  static dynamicEventName(interval, element = window) {
    const eventName = OptimizedScroll.createName(interval);
  
    if (OptimizedScroll.allEvents.indexOf(eventName) === -1) OptimizedScroll.createNewEvent(interval, element);
    return eventName;
  }
  
  static createName(interval) {
    return OptimizedScroll.namePrefix + interval;
  }
  
  static createNewEvent(interval, element = window) {
    const eventName = OptimizedScroll.createName(interval);
  
    const event = new CustomEvent(eventName);
    OptimizedScroll.allEvents.push(eventName);
  
    let didScroll = false;
    element.addEventListener('scroll', function() {
      didScroll = true;
    }, {
      passive: true
    });
    
    setInterval(() => {
      if (didScroll) {
        didScroll = false;
    
        element.dispatchEvent(event);
      }
    }, interval);
  }
  
  static defaultEventName = OptimizedScroll.dynamicEventName(300);
}