Date.prototype.addDays = function(this: Date, days: number): Date {
  this.setDate(this.getDate() + days);
  return this;
};
